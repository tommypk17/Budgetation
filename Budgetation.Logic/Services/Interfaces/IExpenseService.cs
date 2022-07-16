using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IExpenseService<T> where T : AbstractExpense
    {
        public Task<T?> GetExpenseById(Guid userId, Guid id);
        public Task<List<T>?> GetAllUserExpenses(Guid userId);

        public Task<T?> AddUserExpense(Guid userId, T expense);
        public Task<T?> UpdateExpense(Guid userId, T expense);

        public Task<T?> DeleteExpense(Guid userId, Guid id);
        public Task<List<T>?> DuplicateExpenses(Guid userId, List<Guid> ids);
        public Task<List<T>?> GetDuplicateExpenses(Guid userId);
    }
}