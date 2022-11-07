using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.Logic.Controllers;

public class IncomeLogic : AbstractMongoLogic<Income>
{
    public IncomeLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
    {
    }
}