using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budgetation.Data.Services
{
    public class DbRecurringExpenseService : IDbExpenseService<RecurringExpense>
    {
        #nullable enable
        private readonly IMongoCollection<UserExpense> _userExpenses;
        public DbRecurringExpenseService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userExpenses = database.GetCollection<UserExpense>("userExpenses");
        }
        
        public async Task<UserExpense> FindOrCreateUserExpense(Guid userId)
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

        public async Task<RecurringExpense?> Find(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.RecurringExpenses.FirstOrDefault(x => x.Id == id);
        }

        
        public async Task<List<RecurringExpense>?> All(Guid userId, List<Guid> expenseIds)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.RecurringExpenses.Where(x => expenseIds.Contains(x.Id)).ToList();
        }
        
        public async Task<RecurringExpense?> Create(Guid userId, RecurringExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            userExpense.RecurringExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<List<RecurringExpense>?> Read(Guid userId)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.RecurringExpenses;
        }

        public async Task<RecurringExpense?> Update(Guid userId, RecurringExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.RecurringExpenses.FindIndex(x => x.Id == expense.Id);
            if (expenseIdx < 0) return null;
            userExpense.RecurringExpenses.RemoveAt(expenseIdx);
            userExpense.RecurringExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<RecurringExpense?> Delete(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.RecurringExpenses.FindIndex(x => x.Id == id);
            if (expenseIdx < 0) return null;
            RecurringExpense? expense = userExpense.RecurringExpenses.Find(x => x.Id == id);
            if (expense is null) return null;
            userExpense.RecurringExpenses.RemoveAt(expenseIdx);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }
        
        
        public async Task<List<RecurringExpense>?> BulkCreate(Guid userId, List<RecurringExpense> expenses)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            userExpense.RecurringExpenses.AddRange(expenses);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return userExpense.RecurringExpenses;
        }
    }
}