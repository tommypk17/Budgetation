using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
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

        public List<Bill> GetAllUserBills(Guid userId)
        {
            return _dbBillService.FindByUserId(userId).ToList();
        }

        public Bill AddUserBill(Bill bill, Guid? userId)
        {
            if (userId != null)
            {
                bill.UserId = (Guid)userId;
            }
            return _dbBillService.Create(bill);
        }

    }
}