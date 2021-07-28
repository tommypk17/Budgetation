using System;
using System.Collections.Generic;
using Budgetation.Data.Interfaces.IModels;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbBillService
    {
        public IBill Create(IBill user);
        public IList<IBill> Read();
        public IList<IBill> FindByUserId(Guid id);
        public IBill Find(Guid id);
        public IBill Update(IBill user);
        public IBill Delete(Guid id);
    }
}