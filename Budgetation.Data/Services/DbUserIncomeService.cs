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
    public class DbUserIncomeService : IDbUserIncomeService
    {
        #nullable enable
        private readonly IMongoCollection<User> _users;
        public DbUserIncomeService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>("user");
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

        public async Task<UserIncome?> Find(Guid userId, Guid id)
        {
            User user = await FindOrCreateUser(userId);
            return user.Incomes.FirstOrDefault(x => x.Id == id);
        }

        public async Task<UserIncome> Create(Guid userId, UserIncome income)
        {
            User user = await FindOrCreateUser(userId);
            income.Date = new DateTime(income.Date.Year, income.Date.Month, income.Date.Day);
            user.Incomes.Add(income);
            await _users.ReplaceOneAsync(x => x.UserId == userId, user);
            return income;
        }

        public async Task<List<UserIncome>> Read(Guid userId)
        {
            User user = await FindOrCreateUser(userId);
            return user.Incomes;
        }

        public async Task<UserIncome?> Update(Guid userId, UserIncome income)
        {
            User? user = await FindOrCreateUser(userId);
            var incomeIdx = user.Incomes.FindIndex(x => x.Id == income.Id);
            user.Incomes.RemoveAt(incomeIdx);
            user.Incomes.Add(income);
            await _users.ReplaceOneAsync(x => x.UserId == userId, user);
            return income;
        }

        public async Task<UserIncome?> Delete(Guid userId, Guid id)
        {
            User? user = await FindOrCreateUser(userId);
            var incomeIdx = user.Incomes.FindIndex(x => x.Id == id);
            UserIncome? income = user.Incomes.Find(x => x.Id == id);
            user.Incomes.RemoveAt(incomeIdx);
            await _users.ReplaceOneAsync(x => x.UserId == userId, user);
            return income;
        }
    }
}