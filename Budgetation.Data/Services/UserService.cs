using System;
using System.Collections.Generic;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces;
using Budgetation.Data.Interfaces.IModels;
using Budgetation.Data.Models;
using MongoDB.Driver;

namespace Budgetation.Data.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<IUser> _users;
        public UserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<IUser>("user");
        }
        public IUser Create(IUser user)
        {
            _users.InsertOne(user);
            return user;
        }

        public IList<IUser> Read() =>
            _users.Find(user => true).ToList();

        public IUser Find(Guid id) =>
            _users.Find(user => user.Id == id).SingleOrDefault();

        public IUser Update(IUser user)
        {
            _users.ReplaceOne(x => x.Id == user.Id, user);
            return _users.Find(x => x.Id == user.Id).FirstOrDefault();
        }

        public IUser Delete(Guid id)
        {
            IUser user = _users.Find(x => x.Id == id).FirstOrDefault();
            _users.DeleteOne(x => x.Id == id);
            return user;
        }
    }
}