using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;

namespace Budgetation.Logic.Services
{
    public class SingleExpenseService : IExpenseService<SingleExpense>
    {
        private readonly IDbExpenseService<SingleExpense> _dbExpenseService;
        public SingleExpenseService(IDbExpenseService<SingleExpense> dbExpenseService)
        {
            _dbExpenseService = dbExpenseService;
        }

        public async Task<SingleExpense?> GetExpenseById(Guid userId, Guid id)
        {
            return await _dbExpenseService.Find(userId, id);
        }
        public async Task<List<SingleExpense>?> GetAllUserExpenses(Guid userId)
        {
            return await _dbExpenseService.Read(userId);
        }

        public async Task<SingleExpense?> AddUserExpense(Guid userId, SingleExpense expense)
        {
            return await _dbExpenseService.Create(userId, expense);
        }

        public async Task<SingleExpense?> UpdateExpense(Guid userId, SingleExpense expense)
        {
            return await _dbExpenseService.Update(userId, expense);
        }

        public async Task<SingleExpense?> DeleteExpense(Guid userId, Guid id)
        {
            return await _dbExpenseService.Delete(userId, id);
        }

        public async Task<List<SingleExpense>?> DuplicateExpenses(Guid userId, List<Guid> ids)
        {
            return await Task.Run(() => new List<SingleExpense>());
        }

        public async Task<List<SingleExpense>?> GetDuplicateExpenses(Guid userId)
        {
            return await Task.Run(() => new List<SingleExpense>());
        }
    }
}