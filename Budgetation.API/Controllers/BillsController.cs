using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budgetation.API.Utlities;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Budgetation.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly IBillService _billService;
        public BillsController(IBillService billService)
        {
            _billService = billService;
        }
        // GET: api/Bills
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            Guid userId = UserUtility.GetCurrentUserID(User);
            List<Bill> bills = _billService.GetAllUserBills(userId);
            return StatusCode(StatusCodes.Status200OK, bills);
        }

        // GET: api/Bills/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }

        // POST: api/Bills
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bill bill)
        {
            Guid userId = UserUtility.GetCurrentUserID(User);
            Bill res = _billService.AddUserBill(bill, userId);
            return StatusCode(StatusCodes.Status200OK, res);
        }

        // PUT: api/Bills/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }

        // DELETE: api/Bills/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return StatusCode(StatusCodes.Status200OK, "");
        }
    }
}