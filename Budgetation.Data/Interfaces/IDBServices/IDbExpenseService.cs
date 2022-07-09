using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbExpenseService<T> where T : AbstractExpense
    {
        #nullable enable
        public Task<UserExpense> FindOrCreateUserExpense(Guid userId);
        public Task<T?> Find(Guid userId, Guid id);
        public Task<List<T>?> All(Guid userId, List<Guid> expenseIds);
        public Task<T?> Create(Guid userId, T expense);
        public Task<List<T>?> Read(Guid userId);
        public Task<T?> Update(Guid userId, T expense);
        public Task<T?> Delete(Guid userId, Guid id);
        public Task<List<T>?> BulkCreate(Guid userId, List<T> expenses);
    }
}