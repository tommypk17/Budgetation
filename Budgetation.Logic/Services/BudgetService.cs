using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;

namespace Budgetation.Logic.Services;

public class BudgetService : IBudgetService
{
    private readonly IDbBudgetService _dbBudgetService;
    public BudgetService(IDbBudgetService dbBudgetService)
    {
        _dbBudgetService = dbBudgetService;
    }
    
    public async Task<List<UserBudget>> GetUserBudgets(Guid userId)
    {
        return await _dbBudgetService.All(userId);
    }
    
    public async Task<UserBudget?> GetUserBudget(Guid userId, Guid budgetId)
    {
        return await _dbBudgetService.Read(userId, budgetId);
    }
    
    public async Task<BudgetExpense?> GetUserBudgetExpense(Guid userId, Guid budgetId, Guid id)
    {
        return await _dbBudgetService.Find(userId, id);
    }

    public async Task<BudgetExpense?> AddUserBudgetExpense(Guid userId, Guid budgetId, BudgetExpense budgetExpense)
    {
        return await _dbBudgetService.Create(userId, budgetId, budgetExpense);
    }

    public async Task<BudgetExpense?> UpdateUserBudgetExpense(Guid userId, Guid budgetId, BudgetExpense budgetExpense)
    {
        return await _dbBudgetService.Update(userId, budgetId, budgetExpense);
    }

    public async Task<BudgetExpense?> DeleteUserBudgetExpense(Guid userId, Guid budgetId, Guid id)
    {
        return await _dbBudgetService.Delete(userId, budgetId, id);
    }
}