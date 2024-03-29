using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using Budgetation.Data.Services;
using Budgetation.Logic.Services;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;

namespace Budgetation.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //DEBUGS AD issues 
            //Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

            //DB Context
            //DB Settings & Connection
            services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));
            services.AddSingleton<IDatabaseSettings>(x => x.GetRequiredService<IOptions<DatabaseSettings>>().Value);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(options =>
                    {
                        Configuration.Bind("AzureAd", options);

                        options.TokenValidationParameters.NameClaimType = "name";
                    },
                    options => { Configuration.Bind("AzureAd", options); });

            services.AddControllers();
            
            services.AddSwaggerGen();

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowWebApp",
                    builder => 
                        builder.AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials()
                            .WithOrigins(Configuration.GetSection("CORS:allowed").Get<string[]>())
                );
            });
            //MongoDB services
            services.AddSingleton<IDbUserService, DbUserService>();
            services.AddSingleton<IDbExpenseService<SingleExpense>, DbSingleExpenseService>();
            services.AddSingleton<IDbExpenseService<RecurringExpense>, DbRecurringExpenseService>();
            services.AddSingleton<IDbUserIncomeService, DbUserIncomeService>();
            services.AddSingleton<IDbBudgetService, DbBudgetService>();

            //Logic services
            services.AddScoped<IExpenseService<SingleExpense>, SingleExpenseService>();
            services.AddScoped<IExpenseService<RecurringExpense>, RecurringExpenseService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IBudgetService, BudgetService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseDeveloperExceptionPage();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                    c.RoutePrefix = string.Empty;
                });
            }

            app.UseCors("AllowWebApp");
            
            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}