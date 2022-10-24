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
using MongoDB.Driver;

namespace Budgetation.Logic.Services
{
    public class UserLogic : IUserLogic
    {
        private readonly IMongoCollection<User> _users;
        public UserLogic(IDbContext dbContext)
        {
            var ctx = dbContext;
            _users = ctx.Database.GetCollection<User>("user");
        }
        
        private async Task<User> FindOrCreateUser(Guid userId)
        {
            var usersCollection = await _users.FindAsync(x => x.UserId == userId);
            User? user = await usersCollection.FirstOrDefaultAsync();
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
        
        public async Task<User> GetUserById(Guid userId)
        {
            return await FindOrCreateUser(userId);
        }
        
        public async Task<UserIncome?> GetUserIncome(Guid userId, Guid id)
        {
            User user = await FindOrCreateUser(userId);
            return user.Incomes.FirstOrDefault(x => x.Id == id);
        }

        public async Task<User> UpdateUser(User user)
        {
            User existingUser = await FindOrCreateUser(user.UserId);
            user.UserId = existingUser.UserId;
            await _users.ReplaceOneAsync(x => x.UserId == existingUser.UserId, user);
            return user;
        }

        public async Task<List<UserIncome>> GetAllUserIncomes(Guid userId)
        {
            User user = await FindOrCreateUser(userId);
            return user.Incomes;
        }

        public async Task<UserIncome?> AddUserIncome(Guid userId, UserIncome income)
        {
            User user = await FindOrCreateUser(userId);
            income.Date = new DateTime(income.Date.Year, income.Date.Month, income.Date.Day);
            user.Incomes.Add(income);
            await _users.ReplaceOneAsync(x => x.UserId == userId, user);
            return income;
        }

        public async Task<UserIncome?> UpdateUserIncome(Guid userId, UserIncome income)
        {
            User? user = await FindOrCreateUser(userId);
            var incomeIdx = user.Incomes.FindIndex(x => x.Id == income.Id);
            if (incomeIdx <= -1) return null;
            user.Incomes.RemoveAt(incomeIdx);
            user.Incomes.Add(income);
            await _users.ReplaceOneAsync(x => x.UserId == userId, user);
            return income;
        }

        public async Task<UserIncome?> DeleteUserIncome(Guid userId, Guid id)
        {
            User? user = await FindOrCreateUser(userId);
            var incomeIdx = user.Incomes.FindIndex(x => x.Id == id);
            if (incomeIdx <= -1) return null;
            UserIncome? income = user.Incomes.Find(x => x.Id == id);
            user.Incomes.RemoveAt(incomeIdx);
            await _users.ReplaceOneAsync(x => x.UserId == userId, user);
            return income;
        }
        
        public async Task<List<UserPreference>> GetUserPreferences(Guid userId)
        {
            User user = await FindOrCreateUser(userId);
            return user.Preferences;
        }
        
        public async Task<List<UserPreference>> UpdateUserPreferences(Guid userId, UserPreference preference)
        {
            User user = await FindOrCreateUser(userId);
            UserPreference? found = user.Preferences.Find(x => x.Key.ToLower().Trim() == preference.Key.ToLower().Trim());
            if (found is null)
            {
                user.Preferences.Add(preference);
            }
            else
            {
                user.Preferences.Remove(found);
                found.Value = preference.Value;
                user.Preferences.Add(found);
            }

            user = await UpdateUser(user);
            return user.Preferences;
        }
    }
}