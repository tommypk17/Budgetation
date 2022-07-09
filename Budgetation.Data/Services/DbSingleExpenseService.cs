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
    public class DbSingleExpenseService : IDbExpenseService<SingleExpense>
    {
        #nullable enable
        private readonly IMongoCollection<UserExpense> _userExpenses;
        public DbSingleExpenseService(IDatabaseSettings settings)
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

        public async Task<SingleExpense?> Find(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.SingleExpenses.FirstOrDefault(x => x.Id == id);
        }

        
        public async Task<List<SingleExpense>?> All(Guid userId, List<Guid> expenseIds)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.SingleExpenses.Where(x => expenseIds.Contains(x.Id)).ToList();
        }
        
        public async Task<SingleExpense?> Create(Guid userId, SingleExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            userExpense.SingleExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<List<SingleExpense>?> Read(Guid userId)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.SingleExpenses;
        }

        public async Task<SingleExpense?> Update(Guid userId, SingleExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.SingleExpenses.FindIndex(x => x.Id == expense.Id);
            if (expenseIdx < 0) return null;
            userExpense.SingleExpenses.RemoveAt(expenseIdx);
            userExpense.SingleExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<SingleExpense?> Delete(Guid userId, Guid id)
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
        
        
        public async Task<List<SingleExpense>?> BulkCreate(Guid userId, List<SingleExpense> expenses)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            userExpense.SingleExpenses.AddRange(expenses);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return userExpense.SingleExpenses;
        }
    }
}