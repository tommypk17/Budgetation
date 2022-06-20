using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbBillService
    {
        public Task<Bill> Create(Bill user);
        public Task<IList<Bill>> Read();
        public Task<IList<Bill>> FindByUserId(Guid id);
        public Task<Bill> Find(Guid id);
        public Task<Bill> Update(Bill user);
        public Task<Bill> Delete(Guid id);
    }
}