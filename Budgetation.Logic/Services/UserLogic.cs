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
        
        public async Task<User> UpdateUser(User user)
        {
            User existingUser = await FindOrCreateUser(user.UserId);
            user.UserId = existingUser.UserId;
            await _users.ReplaceOneAsync(x => x.UserId == existingUser.UserId, user);
            return user;
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