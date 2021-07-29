using System;
using System.Collections.Generic;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using MongoDB.Driver;

namespace Budgetation.Data.Services
{
    public class DbUserService : IDbUserService
    {
        private readonly IMongoCollection<User> _users;
        public DbUserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>("user");
        }
        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public IList<User> Read() =>
            _users.Find(user => true).ToList();

        public User Find(Guid id) =>
            _users.Find(user => user.Id == id).SingleOrDefault();

        public User Update(User user)
        {
            _users.ReplaceOne(x => x.Id == user.Id, user);
            return _users.Find(x => x.Id == user.Id).FirstOrDefault();
        }

        public User Delete(Guid id)
        {
            User user = _users.Find(x => x.Id == id).FirstOrDefault();
            _users.DeleteOne(x => x.Id == id);
            return user;
        }
    }
}