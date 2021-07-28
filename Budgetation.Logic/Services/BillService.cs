using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Interfaces.IModels;
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

        public List<IBill> GetAllUserBills(Guid userId)
        {
            return _dbBillService.FindByUserId(userId).ToList();
        }
        
    }
}