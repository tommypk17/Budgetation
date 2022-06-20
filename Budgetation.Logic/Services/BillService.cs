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

        public async Task<Bill> GetBillById(Guid id)
        {
            return await _dbBillService.Find(id);
        }
        public async Task<List<Bill>> GetAllUserBills(Guid userId)
        {
            return await _dbBillService.FindByUserId(userId).ContinueWith(q =>
            {
                return q.Result.ToList();
            });
        }

        public async Task<Bill> AddUserBill(Bill bill, Guid? userId)
        {
            if (userId != null)
            {
                bill.UserId = (Guid)userId;
            }
            return await _dbBillService.Create(bill);
        }

        public async Task<Bill> UpdateBill(Bill bill, Guid? id)
        {
            if (id != null)
            {
                bill.Id = (Guid)id;
            }

            return await _dbBillService.Update(bill);
        }

        public async Task<Bill> DeleteBill(Guid id)
        {
            return await _dbBillService.Delete(id);
        }

    }
}