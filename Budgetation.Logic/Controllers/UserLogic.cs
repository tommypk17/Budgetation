using System;
using System.Threading.Tasks;
using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess;
using Mongo.DataAccess.Interfaces;
using Mongo.DataAccess.Interfaces.Utilities;
using MongoDB.Driver;

namespace Budgetation.Logic.Controllers
{
    public class UserLogic : AbstractMongoLogic<User>
    {
        public UserLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
        {
        }
        public override async Task<User?> Single()
        {
            var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
            var filter = Builders<User>.Filter.Eq(x => x.UserId, userId);

            var items = await Collection.FindAsync<User>(filter);
            var res = await items.FirstOrDefaultAsync();

            if (res is not null) return res;
            
            var user = new User();
            res = await Create(user);
            return res;

        }
    }
}