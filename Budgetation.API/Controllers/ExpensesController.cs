using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.API.Models;
using Budgetation.API.Utlities;
using Budgetation.Data.Models;
using Budgetation.Logic.Services;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Budgetation.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService<SingleExpense> _singleExpenseService;
        private readonly IExpenseService<RecurringExpense> _recurringExpenseService;
        public ExpensesController(IExpenseService<SingleExpense> singleExpenseService, IExpenseService<RecurringExpense> recurringExpenseService)
        {
            _singleExpenseService = singleExpenseService;
            _recurringExpenseService = recurringExpenseService;
        }
        
        // GET: api/expenses
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<SingleExpense>? singleExpenses = await _singleExpenseService.GetAllUserExpenses(userId);
            List<RecurringExpense>? recurringExpenses = await _recurringExpenseService.GetAllUserExpenses(userId);
            List<AbstractExpense>? expenses = new List<AbstractExpense>();
            if(singleExpenses is not null) expenses = expenses.Concat(singleExpenses).ToList();
            if(recurringExpenses is not null) expenses = expenses.Concat(recurringExpenses).ToList();
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<SingleExpense>? expenses = await _singleExpenseService.GetAllUserExpenses(userId);
            if (expenses is null || !expenses.Any())
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<SingleExpense>? expenses = await _singleExpenseService.GetAllUserExpenses(userId);
            if (expenses is null)
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            SingleExpense? res = await _singleExpenseService.GetExpenseById(userId, id);
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            SingleExpense? res = await _singleExpenseService.AddUserExpense(userId, expense);
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            SingleExpense? res = await _singleExpenseService.UpdateExpense(userId, expense);
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            SingleExpense? res = await _singleExpenseService.DeleteExpense(userId, id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not deleted", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense deleted", Success = true});
        }
        
        // POST: api/Bills/reoccurrences
        // [HttpPost("reoccurrences")]
        // public async Task<IActionResult> Post([FromBody] List<Guid> billIds)
        // {
        //     Guid userId = UserUtility.GetCurrentUserId(User);
        //     List<Bill>? res = await _billService.AddReoccurrences(userId, billIds);
        //     if (res is null)
        //     {
        //         return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Bills not duplicated", Success = true});
        //     }
        //     return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Bills duplicated", Success = true});
        // }
        
        // GET: api/expenses/recurring
        [HttpGet("recurring")]
        public async Task<IActionResult> GetRecurring()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<RecurringExpense>? expenses = await _recurringExpenseService.GetAllUserExpenses(userId);
            if (expenses is null || !expenses.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No expenses found", Success = true});
            }
            List<RecurringExpense> res = expenses.ToList();
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = res, Message = "Expenses found", Success = true});

        }
        
        // GET: api/expenses/recurring/list
        [HttpGet("recurring/list")]
        public async Task<IActionResult> GetRecurringList()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<RecurringExpense>? expenses = await _recurringExpenseService.GetAllUserExpenses(userId);
            if (expenses is null)
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            RecurringExpense? res = await _recurringExpenseService.GetExpenseById(userId, id);
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            RecurringExpense? res = await _recurringExpenseService.AddUserExpense(userId, expense);
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            RecurringExpense? res = await _recurringExpenseService.UpdateExpense(userId, expense);
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
            Guid userId = UserUtility.GetCurrentUserId(User);
            RecurringExpense? res = await _recurringExpenseService.DeleteExpense(userId, id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Expense not deleted", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Expense deleted", Success = true});
        }
    }
}