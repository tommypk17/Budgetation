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
using Mongo.DataAccess.Interfaces;
using MongoDB.Driver;

namespace Budgetation.Logic.Services
{
    public class SingleExpenseLogic : IExpenseLogic<SingleExpense>
    {
        private readonly IMongoCollection<UserExpense> _userExpenses;
        public SingleExpenseLogic(IDbContext dbContext)
        {
            var ctx = dbContext;
            _userExpenses = ctx.Database.GetCollection<UserExpense>("userExpenses");
        }
        
        private async Task<UserExpense> FindOrCreateUserExpense(Guid userId)
        {
            var userExpenseCollection = await _userExpenses.FindAsync(x => x.UserId == userId);
            UserExpense? userExpense = await userExpenseCollection.FirstOrDefaultAsync();
            if (userExpense is not null)
            {
                return userExpense;
            }
            else
            {
                userExpense = new UserExpense() {UserId = userId};
                await _userExpenses.InsertOneAsync(userExpense);
                return userExpense;
            }
        }

        public async Task<SingleExpense?> GetExpenseById(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.SingleExpenses.FirstOrDefault(x => x.Id == id);
        }
        public async Task<List<SingleExpense>?> GetAllUserExpenses(Guid userId)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.SingleExpenses;
        }

        public async Task<SingleExpense?> AddUserExpense(Guid userId, SingleExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            userExpense.SingleExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<SingleExpense?> UpdateExpense(Guid userId, SingleExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.SingleExpenses.FindIndex(x => x.Id == expense.Id);
            if (expenseIdx < 0) return null;
            userExpense.SingleExpenses.RemoveAt(expenseIdx);
            userExpense.SingleExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<SingleExpense?> DeleteExpense(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.SingleExpenses.FindIndex(x => x.Id == id);
            if (expenseIdx < 0) return null;
            SingleExpense? expense = userExpense.SingleExpenses.Find(x => x.Id == id);
            if (expense is null) return null;
            userExpense.SingleExpenses.RemoveAt(expenseIdx);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<List<SingleExpense>?> DuplicateExpenses(Guid userId, List<Guid> ids)
        {
            return await Task.Run(() => new List<SingleExpense>());
        }

        public async Task<List<SingleExpense>?> GetDuplicateExpenses(Guid userId)
        {
            return await Task.Run(() => new List<SingleExpense>());
        }
    }
}