using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;
using MongoDB.Driver;

namespace Budgetation.Logic.Services;

public class BudgetLogic : MongoLogic<Budget>
{
    public BudgetLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor)
    {
    }
    
    /*private readonly IMongoCollection<User> _users;
    public BudgetLogic(IDbContext dbContext)
    {
        var ctx = dbContext;
        _users = ctx.Database.GetCollection<User>("user");
    }
    
    private async Task<User> FindOrCreateUser(Guid userId)
    {
        var userCollection = await _users.FindAsync(x => x.UserId == userId);
        User? user = await userCollection.FirstOrDefaultAsync();
        if (user is not null)
        {
            return user;
        }
        else
        {
            user = new User() {UserId = userId};
            await _users.InsertOneAsync(user);
            return user;
        }
    }
    
    public async Task<List<UserBudget>> GetUserBudgets(Guid userId)
    {
        User user = await FindOrCreateUser(userId);
        return user.Budgets;
    }
    
    public async Task<UserBudget?> GetUserBudget(Guid userId, Guid budgetId)
    {
        User user = await FindOrCreateUser(userId);
        return user.Budgets.FirstOrDefault(x => x.Id == budgetId);
    }
    
    public async Task<BudgetExpense?> GetUserBudgetExpense(Guid userId, Guid budgetId, Guid id)
    {
        User user = await FindOrCreateUser(userId);
        List<BudgetExpense> budgetExpenses = new List<BudgetExpense>();
        
        foreach (var budget in user.Budgets)
        {
            budgetExpenses.AddRange(budget.Expenses);
        }
        
        return budgetExpenses.FirstOrDefault(x => x.Id == id);
    }

    public async Task<BudgetExpense?> AddUserBudgetExpense(Guid userId, Guid budgetId, BudgetExpense budgetExpense)
    {
        User user = await FindOrCreateUser(userId);
        UserBudget? userBudget = user.Budgets.FirstOrDefault(x => x.Id == budgetId);
        if (userBudget is null) return null;
        userBudget.Expenses.Add(budgetExpense);
        await _users.ReplaceOneAsync(x => x.UserId == userId, user);
        return budgetExpense;
    }

    public async Task<BudgetExpense?> UpdateUserBudgetExpense(Guid userId, Guid budgetId, BudgetExpense budgetExpense)
    {
        User user = await FindOrCreateUser(userId);
        UserBudget? userBudget = user.Budgets.FirstOrDefault(x => x.Id == budgetId);
        if (userBudget is null) return null;
        BudgetExpense? found = userBudget.Expenses.Find(x => x.Id == budgetExpense.Id);
        if (found is null) return null;
        
        userBudget.Expenses.Remove(found);
        userBudget.Expenses.Add(budgetExpense);
        
        await _users.ReplaceOneAsync(x => x.UserId == userId, user);
        return budgetExpense;
    }

    public async Task<BudgetExpense?> DeleteUserBudgetExpense(Guid userId, Guid budgetId, Guid id)
    {
        User user = await FindOrCreateUser(userId);
        UserBudget? userBudget = user.Budgets.FirstOrDefault(x => x.Id == budgetId);
        if (userBudget is null) return null;
        BudgetExpense? found = userBudget.Expenses.Find(x => x.Id == id);
        if (found is null) return null;
        
        userBudget.Expenses.Remove(found);
        
        await _users.ReplaceOneAsync(x => x.UserId == userId, user);
        return found;
    }*/
}