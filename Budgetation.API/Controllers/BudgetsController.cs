using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.API.Models;
using Budgetation.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mongo.DataAccess.Interfaces;

namespace Budgetation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly AbstractMongoLogic<Budget> _budgetLogic;

        public BudgetsController(AbstractMongoLogic<Budget> budgetLogic)
        {
            _budgetLogic = budgetLogic;
        }
        
        // GET: api/Budgets
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<Budget> res = await _budgetLogic.Read();
            if (!res.Any())
            {
                return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "No budgets found", Success = true });
            }
            return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = res, Message = "Budgets found", Success = true });
        }

        // GET: api/Budgets/{budgetId}
        [HttpGet("{budgetId}")]
        public async Task<IActionResult> Get([FromRoute]Guid budgetId)
        {
            Budget? res = await _budgetLogic.Find(budgetId);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "No budget found", Success = true });
            }

            return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = res, Message = "Budget found", Success = true });

        }

        // GET: api/Budgets/{budgetId}/expenses/{expenseId}
        [HttpGet("{budgetId}/expenses/{expenseId}")]
        public async Task<IActionResult> Get([FromRoute]Guid budgetId, [FromRoute]Guid expenseId)
        {
            Budget? budget = await _budgetLogic.Find(budgetId);
            if (budget is null)
            {
                return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget not found", Success = true });
            }

            BudgetExpense? res = budget.Expenses.FirstOrDefault(x => x.Id == expenseId);
            if(res is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not found", Success = true });
            
            return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = res, Message = "Budget expense found", Success = true });

        }

        // POST: api/Budgets/{budgetId}
        [HttpPost("{budgetId}")]
        public async Task<IActionResult> Post([FromRoute] Guid budgetId, [FromBody] BudgetExpense budgetExpense)
        {
            Budget? budget = await _budgetLogic.Find(budgetId);
            if (budget is null)
            {
                return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget not found", Success = false });
            }
            budget.Expenses.Add(budgetExpense);
            Budget? res = await _budgetLogic.Update(budget);
            if(res is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not created", Success = false });

            BudgetExpense? expense = res.Expenses.Find(x => x.Id == budgetExpense.Id);
            if(expense is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not created", Success = false });
            
            return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = expense, Message = "Budget expense created", Success = true });

        }

        // PUT: api/Budgets/{budgetId}
        [HttpPut("{budgetId}")]
        public async Task<IActionResult> Put([FromRoute]Guid budgetId, [FromBody] BudgetExpense budgetExpense)
        {
            Budget? budget = await _budgetLogic.Find(budgetId);
            if (budget is null)
            {
                return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget not found", Success = false });
            }

            var idx = budget.Expenses.FindIndex(x => x.Id == budgetExpense.Id);
            if(idx < 0) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not found", Success = false });
            
            budget.Expenses.RemoveAt(idx);
            budget.Expenses.Add(budgetExpense);
            
            Budget? res = await _budgetLogic.Update(budget);
            if(res is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not created", Success = false });

            BudgetExpense? expense = res.Expenses.Find(x => x.Id == budgetExpense.Id);
            if(expense is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not created", Success = false });
            
            return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = expense, Message = "Budget expense created", Success = true });
            
        }

        // DELETE: api/Budgets/{budgetId}/expenses/{expenseId}
        [HttpDelete("{budgetId}/expenses/{expenseId}")]
        public async Task<IActionResult> Delete([FromRoute] Guid budgetId, [FromRoute] Guid expenseId)
        {
            Budget? budget = await _budgetLogic.Find(budgetId);
            if (budget is null)
            {
                return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget not found", Success = false });
            }

            var toRemove = budget.Expenses.FirstOrDefault(x => x.Id == expenseId);
            if(toRemove is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not found", Success = false });
            
            budget.Expenses.Remove(toRemove);
            
            Budget? res = await _budgetLogic.Update(budget);
            if(res is null) return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = null, Message = "Budget expense not created", Success = false });

            return StatusCode(StatusCodes.Status200OK,new ResponseModel() { Data = toRemove, Message = "Budget expense deleted", Success = true });

        }
    }
}
