using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using MongoDB.Driver;

namespace Budgetation.Data.Services
{
    #nullable enable
    public class DbUserService : IDbUserService
    {
        private readonly IMongoCollection<User> _users;
        public DbUserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>("user");
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
        
        public async Task<User> Create(User newUser)
        {
            User user = await FindOrCreateUser(newUser.UserId);
            user.Roles = newUser.Roles;
            await _users.ReplaceOneAsync(x => x.UserId == user.UserId, user);
            return user;
        }

        public async Task<IList<User>> Read()
        {
            var userCollection = await _users.FindAsync(user => true);
            return userCollection.ToList();
        }

        public async Task<User> Find(Guid userId)
        {
            return await FindOrCreateUser(userId);
        }

        public async Task<User> Update(User existingUser)
        {
            User user = await FindOrCreateUser(existingUser.UserId);
            existingUser.UserId = user.UserId;
            await _users.ReplaceOneAsync(x => x.UserId == user.UserId, existingUser);
            return user;
        }

        public async Task<User?> Delete(Guid userId)
        {
            var userCollection = await _users.FindAsync(x => x.UserId == userId);
            User? user = await userCollection.FirstOrDefaultAsync();
            if (user is not null)
            {
                await _users.DeleteOneAsync(x => x.UserId == userId);
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}