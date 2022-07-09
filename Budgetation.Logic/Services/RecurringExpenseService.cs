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
    public class RecurringExpenseService : IExpenseService<RecurringExpense>
    {
        private readonly IDbExpenseService<RecurringExpense> _dbExpenseService;
        public RecurringExpenseService(IDbExpenseService<RecurringExpense> dbExpenseService)
        {
            _dbExpenseService = dbExpenseService;
        }

        public async Task<RecurringExpense?> GetExpenseById(Guid userId, Guid id)
        {
            return await _dbExpenseService.Find(userId, id);
        }
        public async Task<List<RecurringExpense>?> GetAllUserExpenses(Guid userId)
        {
            return await _dbExpenseService.Read(userId);
        }

        public async Task<RecurringExpense?> AddUserExpense(Guid userId, RecurringExpense expense)
        {
            return await _dbExpenseService.Create(userId, expense);
        }

        public async Task<RecurringExpense?> UpdateExpense(Guid userId, RecurringExpense expense)
        {
            return await _dbExpenseService.Update(userId, expense);
        }

        public async Task<RecurringExpense?> DeleteExpense(Guid userId, Guid id)
        {
            return await _dbExpenseService.Delete(userId, id);
        }
    }
}