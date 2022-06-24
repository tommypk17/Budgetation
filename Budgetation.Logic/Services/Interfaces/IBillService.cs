using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IBillService
    {
        public Task<Bill?> GetBillById(Guid userId, Guid id);
        public Task<List<Bill>?> GetAllUserBills(Guid userId);

        public Task<Bill?> AddUserBill(Guid userId, Bill bill);
        public Task<Bill?> UpdateBill(Guid userId, Bill bill);

        public Task<Bill?> DeleteBill(Guid userId, Guid id);
    }
}