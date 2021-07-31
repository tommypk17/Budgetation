using System;
using System.Collections.Generic;
using System.Security.Principal;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IBillService
    {
        public Bill GetBillById(Guid id);
        public List<Bill> GetAllUserBills(Guid userId);
        public Bill AddUserBill(Bill bill, Guid? userId);
        public Bill UpdateBill(Bill bill, Guid? id);
        public Bill DeleteBill(Guid id);
    }
}