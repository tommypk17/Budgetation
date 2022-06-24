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

    }
}