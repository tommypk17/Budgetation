using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.API.Models;
using Budgetation.API.Utlities;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Budgetation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly IBudgetLogic _budgetLogic;

        public BudgetsController(IBudgetLogic budgetLogic)
        {
            _budgetLogic = budgetLogic;
        }
        
        // GET: api/Budgets
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<UserBudget> res = await _budgetLogic.GetUserBudgets(userId);
            if (!res.Any())
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ResponseModel() { Data = null, Message = "No budgets found", Success = true });
            }

            return StatusCode(StatusCodes.Status200OK,
                new ResponseModel() { Data = res, Message = "Budgets found", Success = true });

        }

        // GET: api/Budgets/{budgetId}
        [HttpGet("{budgetId}")]
        public async Task<IActionResult> Get([FromRoute]Guid budgetId)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            UserBudget? res = await _budgetLogic.GetUserBudget(userId, budgetId);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ResponseModel() { Data = null, Message = "No budget found", Success = true });
            }

            return StatusCode(StatusCodes.Status200OK,
                new ResponseModel() { Data = res, Message = "Budget found", Success = true });

        }

        // GET: api/Budgets/{budgetId}/expenses/{expenseId}
        [HttpGet("{budgetId}/expenses/{expenseId}")]
        public async Task<IActionResult> Get([FromRoute]Guid budgetId, [FromRoute]Guid expenseId)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            BudgetExpense? res = await _budgetLogic.GetUserBudgetExpense(userId, budgetId, expenseId);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ResponseModel() { Data = null, Message = "Budget expense not found", Success = true });
            }

            return StatusCode(StatusCodes.Status200OK,
                new ResponseModel() { Data = res, Message = "Budget expense found", Success = true });
        }

        // POST: api/Budgets/{budgetId}
        [HttpPost("{budgetId}")]
        public async Task<IActionResult> Post([FromRoute] Guid budgetId, [FromBody] BudgetExpense budgetExpense)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            BudgetExpense? res = await _budgetLogic.AddUserBudgetExpense(userId, budgetId, budgetExpense);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ResponseModel() { Data = null, Message = "Budget expense not created", Success = false });
            }

            return StatusCode(StatusCodes.Status200OK,
                new ResponseModel() { Data = res, Message = "Budget expense created", Success = true });
        }

        // PUT: api/Budgets/{budgetId}
        [HttpPut("{budgetId}")]
        public async Task<IActionResult> Put([FromRoute]Guid budgetId, [FromBody] BudgetExpense budgetExpense)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            BudgetExpense? res = await _budgetLogic.UpdateUserBudgetExpense(userId, budgetId, budgetExpense);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ResponseModel() { Data = null, Message = "Budget expense not updated", Success = false });
            }

            return StatusCode(StatusCodes.Status200OK,
                new ResponseModel() { Data = res, Message = "Budget expense updated", Success = true });
        }

        // DELETE: api/Budgets/{budgetId}/expenses/{expenseId}
        [HttpDelete("{budgetId}/expenses/{expenseId}")]
        public async Task<IActionResult> Delete([FromRoute] Guid budgetId, [FromRoute] Guid expenseId)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            BudgetExpense? res = await _budgetLogic.DeleteUserBudgetExpense(userId, budgetId, expenseId);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ResponseModel() { Data = null, Message = "Budget expense not deleted", Success = false });
            }

            return StatusCode(StatusCodes.Status200OK,
                new ResponseModel() { Data = res, Message = "Budget expense deleted", Success = true });
        }
    }
}
