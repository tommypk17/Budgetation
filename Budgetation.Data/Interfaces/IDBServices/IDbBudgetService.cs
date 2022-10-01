using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices;

public interface IDbBudgetService
{
#nullable enable
    public Task<List<UserBudget>> All(Guid userId);
    public Task<UserBudget?> Read(Guid userId, Guid budgetId);
    public Task<BudgetExpense?> Find(Guid userId, Guid id);
    public Task<BudgetExpense?> Create(Guid userId, Guid budgetId, BudgetExpense budgetExpense);
    public Task<BudgetExpense?> Update(Guid userId, Guid budgetId, BudgetExpense budgetExpense);
    public Task<BudgetExpense?> Delete(Guid userId, Guid budgetId, Guid id);
}