using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IBillService
    {
        public Task<Bill?> GetBillById(Guid id);
        public Task<List<Bill>?> GetAllUserBills(Guid userId);
        public Task<Bill?> AddUserBill(Bill bill, Guid? userId);
        public Task<Bill?> UpdateBill(Bill bill, Guid? id);
        public Task<Bill?> DeleteBill(Guid id);
    }
}