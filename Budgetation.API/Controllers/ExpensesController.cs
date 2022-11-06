using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.API.Models;
using Budgetation.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IMongoLogic<SingleExpense> _singleExpenseLogic;
        private readonly IMongoLogic<RecurringExpense> _recurringExpenseLogic;
        public ExpensesController(IMongoLogic<SingleExpense> singleExpenseLogic, IMongoLogic<RecurringExpense> recurringExpenseLogic)
        {
            _singleExpenseLogic = singleExpenseLogic;
            _recurringExpenseLogic = recurringExpenseLogic;
        }
        
        // GET: api/expenses
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<SingleExpense> singleExpenses = await _singleExpenseLogic.Read();
            IList<RecurringExpense> recurringExpenses = await _recurringExpenseLogic.Read();
            List<object>? expenses = new List<object>();
            if(singleExpenses.Any()) expenses = expenses.Concat(singleExpenses).ToList();
            if(recurringExpenses.Any()) expenses = expenses.Concat(recurringExpenses).ToList();
            if (!expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No expenses found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = expenses, Message = "Expenses found", Success = true});

        }
        
        // GET: api/expenses/single
        [HttpGet("single")]
        public async Task<IActionResult> GetSingle()
        {
            IList<SingleExpense> expenses = await _singleExpenseLogic.Read();
            if (!expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No expenses found", Success = true});
            }
            List<SingleExpense> res = expenses.ToList();
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = res, Message = "Expenses found", Success = true});

        }
        
        // GET: api/expenses/single/list
        [HttpGet("single/list")]
        public async Task<IActionResult> GetSingleList()
        {
            IList<SingleExpense> expenses = await _singleExpenseLogic.Read();
            if (!expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expenses not found", Success = true});
            }
            List<KeyValuePair<Guid, string>> res = new List<KeyValuePair<Guid, string>>();
            foreach (SingleExpense expense in expenses)
            {
                KeyValuePair<Guid, string> temp = KeyValuePair.Create<Guid, string>(expense.Id, expense.Name);
                res.Add(temp);
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expenses found", Success = true});

            
        }

        // GET: api/expenses/single/5
        [HttpGet("single/{id}")]
        public async Task<IActionResult> GetSingle(Guid id)
        {
            SingleExpense? res = await _singleExpenseLogic.Find(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense found", Success = true});
            
        }

        // POST: api/expenses/single
        [HttpPost("single")]
        public async Task<IActionResult> PostSingle([FromBody] SingleExpense expense)
        {
            SingleExpense? res = await _singleExpenseLogic.Create(expense);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense created", Success = true});
        }

        // PUT: api/expenses/single/5
        [HttpPut("single/{id}")]
        public async Task<IActionResult> PutSingle(Guid id, [FromBody] SingleExpense expense)
        {
            SingleExpense? res = await _singleExpenseLogic.Update(expense);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not updated", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense updated", Success = true});
        }

        // DELETE: api/expenses/single/5
        [HttpDelete("single/{id}")]
        public async Task<IActionResult> DeleteSingle(Guid id)
        {
            SingleExpense? res = await _singleExpenseLogic.Delete(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not deleted", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense deleted", Success = true});
        }
        
        // POST: api/Bills/recurring/duplicate
        [HttpPost("recurring/duplicate")]
        public async Task<IActionResult> Post([FromBody] List<Guid> expenseIds)
        {
            IList<RecurringExpense> expenses = await _recurringExpenseLogic.Read();
            if (!expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No expenses found", Success = false});
            }
            
            List<RecurringExpense> toDuplicate = expenses.Where(x => expenseIds.Contains(x.Id)).ToList();
            if (!toDuplicate.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No expenses found", Success = false});
            }
            List<RecurringExpense> recurringExpenses = new List<RecurringExpense>();
            foreach (RecurringExpense recurringExpense in toDuplicate)
            {
                RecurringExpense expense = new RecurringExpense()
                {
                    Name = recurringExpense.Name,
                    Amount = 0,
                    Interval = recurringExpense.Interval,
                    ReoccurrenceId = recurringExpense.ReoccurrenceId,
                    Type = recurringExpense.Type,
                    PaidOn = null,
                    Due = RecurringExpense.GetNextDueDate(recurringExpense.Interval, recurringExpense.Due)
                };
                recurringExpenses.Add(expense);
            }

            IList<RecurringExpense> res = await _recurringExpenseLogic.BulkCreate(recurringExpenses);
            
            if(res.Any()) return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expenses duplicated", Success = true});
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expenses not duplicated", Success = false});
        }
        
        // GET: api/Bills/recurring/duplicate
        [HttpGet("recurring/duplicate")]
        public async Task<IActionResult> GetDuplicateRecurringExpenses()
        {
            IList<RecurringExpense> expenses = await _recurringExpenseLogic.Read();
            if (!expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No duplicate expenses", Success = true});
            }
            List<RecurringExpense> res = expenses.GroupBy(x => x.ReoccurrenceId)
                .Select(x =>
                    x.OrderByDescending(z => z.Due)
                        .First()
                ).Where(x => x.PaidOn is not null).ToList();
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense duplicates found", Success = true});
        }
        
        // GET: api/expenses/recurring
        [HttpGet("recurring")]
        public async Task<IActionResult> GetRecurring()
        {
            IList<RecurringExpense> res = await _recurringExpenseLogic.Read();
            if (!res.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No expenses found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = res, Message = "Expenses found", Success = true});

        }
        
        // GET: api/expenses/recurring/list
        [HttpGet("recurring/list")]
        public async Task<IActionResult> GetRecurringList()
        {
            IList<RecurringExpense> expenses = await _recurringExpenseLogic.Read();
            if (!expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expenses not found", Success = true});
            }
            List<KeyValuePair<Guid, string>> res = new List<KeyValuePair<Guid, string>>();
            foreach (RecurringExpense expense in expenses)
            {
                KeyValuePair<Guid, string> temp = KeyValuePair.Create<Guid, string>(expense.Id, expense.Name);
                res.Add(temp);
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expenses found", Success = true});

        }

        // GET: api/expenses/recurring/5
        [HttpGet("recurring/{id}")]
        public async Task<IActionResult> GetRecurring(Guid id)
        {
            RecurringExpense? res = await _recurringExpenseLogic.Find(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense found", Success = true});
        }

        // POST: api/expenses/recurring
        [HttpPost("recurring")]
        public async Task<IActionResult> PostRecurring([FromBody] RecurringExpense expense)
        {
            RecurringExpense? res = await _recurringExpenseLogic.Create(expense);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense created", Success = true});
        }

        // PUT: api/expenses/recurring/5
        [HttpPut("recurring/{id}")]
        public async Task<IActionResult> PutRecurring(Guid id, [FromBody] RecurringExpense expense)
        {
            RecurringExpense? res = await _recurringExpenseLogic.Update(expense);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not updated", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense updated", Success = true});
        }

        // DELETE: api/expenses/recurring/5
        [HttpDelete("recurring/{id}")]
        public async Task<IActionResult> DeleteRecurring(Guid id)
        {
            RecurringExpense? res = await _recurringExpenseLogic.Delete(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not deleted", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense deleted", Success = true});
        }
    }
}