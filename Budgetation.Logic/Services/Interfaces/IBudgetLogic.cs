using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces;

public interface IBudgetLogic
{
    public Task<List<UserBudget>> GetUserBudgets(Guid userId);
    public Task<UserBudget?> GetUserBudget(Guid userId, Guid budgetId);
    public Task<BudgetExpense?> GetUserBudgetExpense(Guid userId, Guid budgetId, Guid id);
    
    public Task<BudgetExpense?> AddUserBudgetExpense(Guid userId, Guid budgetId, BudgetExpense budgetExpense);
    public Task<BudgetExpense?> UpdateUserBudgetExpense(Guid userId, Guid budgetId, BudgetExpense budgetExpense);
    public Task<BudgetExpense?> DeleteUserBudgetExpense(Guid userId, Guid budgetId, Guid id);
}