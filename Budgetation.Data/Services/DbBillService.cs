using System;
using System.Collections;
using System.Collections.Generic;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Interfaces.IModels;
using Budgetation.Data.Models;
using MongoDB.Driver;

namespace Budgetation.Data.Services
{
    public class DbBillService : IDbBillService
    {
        private readonly IMongoCollection<IBill> _bills;
        public DbBillService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _bills = database.GetCollection<IBill>("bills");
        }
        public IBill Create(IBill bill)
        {
            _bills.InsertOne(bill);
            return bill;
        }

        public IList<IBill> Read() =>
            _bills.Find(user => true).ToList();

        public IList<IBill> FindByUserId(Guid id) =>
            _bills.Find(bill => bill.UserId == id).ToList();

        public IBill Find(Guid id) =>
            _bills.Find(bill => bill.Id == id).SingleOrDefault();

        public IBill Update(IBill bill)
        {
            _bills.ReplaceOne(x => x.Id == bill.Id, bill);
            return _bills.Find(x => x.Id == bill.Id).FirstOrDefault();
        }

        public IBill Delete(Guid id)
        {
            IBill user = _bills.Find(x => x.Id == id).FirstOrDefault();
            _bills.DeleteOne(x => x.Id == id);
            return user;
        }
    }
}