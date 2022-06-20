using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using MongoDB.Bson;
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
        public async Task<Bill> Create(Bill bill)
        {
            await _bills.InsertOneAsync(bill);
            return bill;
        }

        public async Task<IList<Bill>> Read() => 
            await _bills.FindAsync(user => true).Result.ToListAsync();

        public async Task<IList<Bill>> FindByUserId(Guid id) =>
           await  _bills.FindAsync(bill => bill.UserId == id).Result.ToListAsync();

        public async Task<Bill> Find(Guid id) =>
            await _bills.FindAsync(bill => bill.Id == id).Result.FirstOrDefaultAsync();

        public async Task<Bill> Update(Bill bill)
        {
            return await _bills.ReplaceOneAsync(x => x.Id == bill.Id, bill).ContinueWith(q =>
            {
                return _bills.Find(x => x.Id == bill.Id).FirstOrDefault();
            });
        }

        public async Task<Bill> Delete(Guid id)
        {
            return await _bills.FindAsync(x => x.Id == id).Result.FirstOrDefaultAsync().ContinueWith(q =>
            {
                _bills.DeleteOne(x => x.Id == id);
                return q.Result;
            });
        }
    }
}