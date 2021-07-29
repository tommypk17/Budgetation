using System;
using System.Collections;
using System.Collections.Generic;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using MongoDB.Driver;

namespace Budgetation.Data.Services
{
    public class DbBillService : IDbBillService
    {
        private readonly IMongoCollection<Bill> _bills;
        public DbBillService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _bills = database.GetCollection<Bill>("bills");
        }
        public Bill Create(Bill bill)
        {
            _bills.InsertOne(bill);
            return bill;
        }

        public IList<Bill> Read() =>
            _bills.Find(user => true).ToList();

        public IList<Bill> FindByUserId(Guid id) =>
            _bills.Find(bill => bill.UserId == id).ToList();

        public Bill Find(Guid id) =>
            _bills.Find(bill => bill.Id == id).SingleOrDefault();

        public Bill Update(Bill bill)
        {
            _bills.ReplaceOne(x => x.Id == bill.Id, bill);
            return _bills.Find(x => x.Id == bill.Id).FirstOrDefault();
        }

        public Bill Delete(Guid id)
        {
            Bill user = _bills.Find(x => x.Id == id).FirstOrDefault();
            _bills.DeleteOne(x => x.Id == id);
            return user;
        }
    }
}