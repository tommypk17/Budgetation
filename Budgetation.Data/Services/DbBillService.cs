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
    public class DbBillService : IDbBillService
    {
        #nullable enable
        private readonly IMongoCollection<UserBill> _userBills;
        public DbBillService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userBills = database.GetCollection<UserBill>("userBills");
        }
        
        private async Task<UserBill> FindOrCreateUserBill(Guid userId)
        {
            var userBillCollection = await _userBills.FindAsync(x => x.UserId == userId);
            UserBill? userBill = await userBillCollection.FirstOrDefaultAsync();
            if (userBill is not null)
            {
                return userBill;
            }
            else
            {
                userBill = new UserBill() {UserId = userId, Bills = new List<Bill>()};
                await _userBills.InsertOneAsync(userBill);
                return userBill;
            }
        }

        public async Task<Bill?> Find(Guid userId, Guid id)
        {
            UserBill userBill = await FindOrCreateUserBill(userId);
            return userBill.Bills.FirstOrDefault(x => x.Id == id);
        }

        public async Task<Bill?> Create(Guid userId, Bill bill)
        {
            UserBill userBill = await FindOrCreateUserBill(userId);
            userBill.Bills.Add(bill);
            await _userBills.ReplaceOneAsync(x => x.UserId == userId, userBill);
            return bill;
        }

        public async Task<List<Bill>?> Read(Guid userId)
        {
            UserBill userBill = await FindOrCreateUserBill(userId);
            return userBill.Bills;
        }

        public async Task<Bill?> Update(Guid userId, Bill bill)
        {
            UserBill? userBill = await FindOrCreateUserBill(userId);
            var billIdx = userBill.Bills.FindIndex(x => x.Id == bill.Id);
            userBill.Bills.RemoveAt(billIdx);
            userBill.Bills.Add(bill);
            await _userBills.ReplaceOneAsync(x => x.UserId == userId, userBill);
            return bill;
        }

        public async Task<Bill?> Delete(Guid userId, Guid id)
        {
            UserBill? userBill = await FindOrCreateUserBill(userId);
            var billIdx = userBill.Bills.FindIndex(x => x.Id == id);
            Bill? bill = userBill.Bills.Find(x => x.Id == id);
            userBill.Bills.RemoveAt(billIdx);
            await _userBills.ReplaceOneAsync(x => x.UserId == userId, userBill);
            return bill;
        }
    }
}