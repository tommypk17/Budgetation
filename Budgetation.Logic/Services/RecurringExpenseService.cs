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

        public async Task<List<RecurringExpense>?> DuplicateExpenses(Guid userId, List<Guid> ids)
        {
            List<RecurringExpense>? expenses = await _dbExpenseService.All(userId, ids);
            if (expenses is null)
            {
                return null;
            }
            List<RecurringExpense> res = new List<RecurringExpense>();
            foreach (RecurringExpense recurringExpense in expenses)
            {
                res.Add(new RecurringExpense()
                {
                    Name = recurringExpense.Name,
                    Amount = 0,
                    Interval = recurringExpense.Interval,
                    ReoccurrenceId = recurringExpense.ReoccurrenceId,
                    Type = recurringExpense.Type,
                    PaidOn = null,
                    Due = GetNextDueDate(recurringExpense.Interval, recurringExpense.Due)
                });
            }

            await _dbExpenseService.Create(userId, res);
            return await _dbExpenseService.All(userId, res.Select(x => x.Id).ToList());
        }

        public async Task<List<RecurringExpense>?> GetDuplicateExpenses(Guid userId)
        {
            List<RecurringExpense>? expenses = await _dbExpenseService.Read(userId);
            if (expenses is null)
            {
                return null;
            }
            List<RecurringExpense> res = expenses.GroupBy(x => x.ReoccurrenceId)
                .Select(x =>
                    x.OrderByDescending(z => z.Due)
                        .First()
                ).Where(x => x.PaidOn is not null).ToList();
            return res;
        }

        private DateTime GetNextDueDate(EReoccurrence interval, DateTime date)
        {
            DateTime res = interval switch
            {
                EReoccurrence.Weekly => date.AddDays(7),
                EReoccurrence.Biweekly => date.AddDays(14),
                EReoccurrence.Monthly => date.AddMonths(1),
                EReoccurrence.Quarterly => date.AddMonths(3),
                EReoccurrence.Biquarterly => date.AddMonths(6),
                EReoccurrence.Yearly => date.AddYears(1),
                _ => date
            };
            return res;
        }
    }
}