using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.API.Utlities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Budgetation.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        // GET: api/Expense
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }

        // GET: api/Expense/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }

        // POST: api/Expense
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string value)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }

        // PUT: api/Expense/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }

        // DELETE: api/Expense/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }
    }
}