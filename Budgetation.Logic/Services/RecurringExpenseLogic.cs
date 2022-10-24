using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;
using MongoDB.Driver;

namespace Budgetation.Logic.Services
{
    public class RecurringExpenseLogic : IExpenseLogic<RecurringExpense>
    {
        private readonly IMongoCollection<UserExpense> _userExpenses;
        public RecurringExpenseLogic(IDbContext dbContext)
        {
            var ctx = dbContext;
            _userExpenses = ctx.Database.GetCollection<UserExpense>("userExpenses");
        }
        
        private async Task<UserExpense> FindOrCreateUserExpense(Guid userId)
        {
            var userExpenseCollection = await _userExpenses.FindAsync(x => x.UserId == userId);
            UserExpense? userExpense = await userExpenseCollection.FirstOrDefaultAsync();
            if (userExpense is not null)
            {
                return userExpense;
            }
            else
            {
                userExpense = new UserExpense() {UserId = userId};
                await _userExpenses.InsertOneAsync(userExpense);
                return userExpense;
            }
        }

        public async Task<RecurringExpense?> GetExpenseById(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.RecurringExpenses.FirstOrDefault(x => x.Id == id);
        }
        public async Task<List<RecurringExpense>?> GetAllUserExpenses(Guid userId)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            return userExpense.RecurringExpenses;
        }

        public async Task<RecurringExpense?> AddUserExpense(Guid userId, RecurringExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            userExpense.RecurringExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<RecurringExpense?> UpdateExpense(Guid userId, RecurringExpense expense)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.RecurringExpenses.FindIndex(x => x.Id == expense.Id);
            if (expenseIdx < 0) return null;
            userExpense.RecurringExpenses.RemoveAt(expenseIdx);
            userExpense.RecurringExpenses.Add(expense);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<RecurringExpense?> DeleteExpense(Guid userId, Guid id)
        {
            UserExpense userExpense = await FindOrCreateUserExpense(userId);
            var expenseIdx = userExpense.RecurringExpenses.FindIndex(x => x.Id == id);
            if (expenseIdx < 0) return null;
            RecurringExpense? expense = userExpense.RecurringExpenses.Find(x => x.Id == id);
            if (expense is null) return null;
            userExpense.RecurringExpenses.RemoveAt(expenseIdx);
            await _userExpenses.ReplaceOneAsync(x => x.UserId == userId, userExpense);
            return expense;
        }

        public async Task<List<RecurringExpense>?> DuplicateExpenses(Guid userId, List<Guid> ids)
        {
            UserExpense? userExpense = await FindOrCreateUserExpense(userId);
            List<RecurringExpense> expenses = userExpense.RecurringExpenses.Where(x => ids.Contains(x.Id)).ToList();
            if (!expenses.Any())
            {
                return null;
            }

            List<RecurringExpense> duplicatedExpenses = new List<RecurringExpense>();
            foreach (RecurringExpense recurringExpense in expenses)
            {
                RecurringExpense expense = new RecurringExpense()
                {
                    Name = recurringExpense.Name,
                    Amount = 0,
                    Interval = recurringExpense.Interval,
                    ReoccurrenceId = recurringExpense.ReoccurrenceId,
                    Type = recurringExpense.Type,
                    PaidOn = null,
                    Due = GetNextDueDate(recurringExpense.Interval, recurringExpense.Due)
                };
                var duplicated = await AddUserExpense(userId, expense);
                if (duplicated is not null)
                {
                    duplicatedExpenses.Add(duplicated);
                }
            }
            return duplicatedExpenses;
        }

        public async Task<List<RecurringExpense>?> GetDuplicateExpenses(Guid userId)
        {
            List<RecurringExpense>? expenses = await GetAllUserExpenses(userId);
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