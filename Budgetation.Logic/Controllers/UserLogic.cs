using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.Logic.Controllers
{
    public class UserLogic : MongoLogic<User>
    {
        public UserLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
        {
        }
    }
}