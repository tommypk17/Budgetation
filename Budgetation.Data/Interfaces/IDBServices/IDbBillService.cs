using System;
using System.Collections.Generic;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbBillService
    {
        public Bill Create(Bill user);
        public IList<Bill> Read();
        public IList<Bill> FindByUserId(Guid id);
        public Bill Find(Guid id);
        public Bill Update(Bill user);
        public Bill Delete(Guid id);
    }
}