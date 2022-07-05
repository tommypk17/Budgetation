using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;

namespace Budgetation.Logic.Services
{
    public class BillService : IBillService
    {
        private readonly IDbBillService _dbBillService;
        public BillService(IDbBillService dbBillService)
        {
            _dbBillService = dbBillService;
        }

        public async Task<Bill?> GetBillById(Guid userId, Guid id)
        {
            return await _dbBillService.Find(userId, id);
        }
        public async Task<List<Bill>?> GetAllUserBills(Guid userId)
        {
            return await _dbBillService.Read(userId);
        }

        public async Task<Bill?> AddUserBill(Guid userId, Bill bill)
        {
            return await _dbBillService.Create(userId, bill);
        }

        public async Task<Bill?> UpdateBill(Guid userId, Bill bill)
        {
            return await _dbBillService.Update(userId, bill);
        }

        public async Task<Bill?> DeleteBill(Guid userId, Guid id)
        {
            return await _dbBillService.Delete(userId, id);
        }

        public async Task<List<Bill>?> AddReoccurrences(Guid userId, List<Guid> billIds)
        {
            List<Bill>? bills = await _dbBillService.All(userId, billIds);
            if (bills is null || bills.Count < 1) return null;

            List<Bill> newBills = new List<Bill>();
            foreach (Bill bill in bills)
            {
                Expense expense = new Expense() {Amount = 0, Name = bill.Expense.Name, Type = bill.Expense.Type};
                DateTime begin = bill.Begin ?? DateTime.Today;
                DateTime due = bill.Due ?? DateTime.Today;
                switch (bill.Reoccurrence)
                {
                    case nameof(eReoccurrence.Weekly):
                        due = due.AddDays(7);
                        break;
                    case nameof(eReoccurrence.Biweekly):
                        due = due.AddDays(14);
                        break;
                    case nameof(eReoccurrence.Monthly):
                        due = due.AddMonths(1);
                        break;
                    case nameof(eReoccurrence.Quarterly):
                        due = due.AddMonths(3);
                        break;
                    case nameof(eReoccurrence.Biquarterly):
                        due = due.AddMonths(6);
                        break;
                    case nameof(eReoccurrence.Yearly):
                        due = due.AddYears(1);
                        break;
                }
                Bill toAdd = new Bill()
                {
                    Expense = expense,
                    Begin = begin,
                    Due = due,
                    Paid = false,
                    Reoccurrence = bill.Reoccurrence
                };
                newBills.Add(toAdd);
            }

            return await _dbBillService.BulkCreate(userId, newBills);
        }
    }
}