using System;
using System.Collections.Generic;
using System.Security.Principal;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IBillService
    {
        public List<Bill> GetAllUserBills(Guid userId);
        public Bill AddUserBill(Bill bill, Guid? userId);
    }
}