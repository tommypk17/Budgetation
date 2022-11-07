using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.Logic.Controllers
{
    public class SingleExpenseLogic : AbstractMongoLogic<SingleExpense>
    {
        public SingleExpenseLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
        {
        }
    }
}