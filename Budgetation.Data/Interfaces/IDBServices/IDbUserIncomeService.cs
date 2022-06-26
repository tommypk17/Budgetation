using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbUserIncomeService
    {
        #nullable enable
        public Task<UserIncome> Create(Guid userId, UserIncome income);
        public Task<List<UserIncome>> Read(Guid userId);
        public Task<UserIncome?> Find(Guid userId, Guid id);
        public Task<UserIncome?> Update(Guid userId, UserIncome income);
        public Task<UserIncome?> Delete(Guid userId, Guid id);
    }
}