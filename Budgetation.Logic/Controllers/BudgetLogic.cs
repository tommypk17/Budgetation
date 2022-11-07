using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.Logic.Controllers;

public class BudgetLogic : AbstractMongoLogic<Budget>
{
    public BudgetLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
    {
    }
}