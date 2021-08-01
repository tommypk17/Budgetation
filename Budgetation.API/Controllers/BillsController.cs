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
        
        // GET: api/Bills
        [HttpGet("list")]
        public async Task<IActionResult> GetList()
        {
            Guid userId = UserUtility.GetCurrentUserID(User);
            List<Bill> bills = _billService.GetAllUserBills(userId);
            List<KeyValuePair<Guid, string>> list = new List<KeyValuePair<Guid, string>>();
            foreach (Bill bill in bills)
            {
                KeyValuePair<Guid, string> temp = KeyValuePair.Create<Guid, string>(bill.Id, bill.Expense.Name);
                list.Add(temp);
            }
            return StatusCode(StatusCodes.Status200OK, list);
        }

        // GET: api/Bills/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(Guid id)
        {
            Bill res = _billService.GetBillById(id);
            return StatusCode(StatusCodes.Status200OK, res);
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
        public async Task<IActionResult> Put(Guid id, [FromBody] Bill bill)
        {
            Bill res = _billService.UpdateBill(bill, id);
            return StatusCode(StatusCodes.Status200OK, res);
        }

        // DELETE: api/Bills/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            Bill res = _billService.DeleteBill(id);
            return StatusCode(StatusCodes.Status200OK, res);
        }
    }
}