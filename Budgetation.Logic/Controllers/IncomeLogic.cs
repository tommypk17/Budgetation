using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;
using Mongo.DataAccess.Interfaces.Utilities;
using MongoDB.Driver;
using IDbContext = Mongo.DataAccess.Interfaces.IDbContext;

namespace Budgetation.Logic.Controllers;

public class IncomeLogic : MongoLogic<Income>
{
    public IncomeLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
    {
    }
}