using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbBillService
    {
        #nullable enable
        public Task<Bill?> Find(Guid userId, Guid id);
        public Task<Bill?> Create(Guid userId, Bill user);
        public Task<List<Bill>?> Read(Guid userId);
        public Task<Bill?> Update(Guid userId, Bill user);
        public Task<Bill?> Delete(Guid userId, Guid id);
    }
}