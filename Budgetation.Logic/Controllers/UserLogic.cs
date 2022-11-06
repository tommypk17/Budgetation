using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;
using Mongo.DataAccess.Interfaces.Utilities;
using MongoDB.Driver;
using IDbContext = Mongo.DataAccess.Interfaces.IDbContext;

namespace Budgetation.Logic.Controllers
{
    public class UserLogic : MongoLogic<User>
    {
        public UserLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
        {
        }
    }
}