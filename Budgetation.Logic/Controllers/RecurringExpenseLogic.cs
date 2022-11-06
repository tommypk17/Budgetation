using System;
using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.Logic.Controllers;

public class RecurringExpenseLogic : MongoLogic<RecurringExpense>
{
    public RecurringExpenseLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
    {
    }
}