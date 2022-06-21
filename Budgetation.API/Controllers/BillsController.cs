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
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<Bill>? bills = await _billService.GetAllUserBills(userId);
            if (bills is null || !bills.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No bills found", Success = true});
            }
            List<Bill> res = bills.ToList();
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = res, Message = "Bill found", Success = true});

        }
        
        // GET: api/Bills
        [HttpGet("list")]
        public async Task<IActionResult> GetList()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<Bill>? bills = await _billService.GetAllUserBills(userId);
            if (bills is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Bills not found", Success = true});
            }
            List<KeyValuePair<Guid, string>> res = new List<KeyValuePair<Guid, string>>();
            foreach (Bill bill in bills)
            {
                KeyValuePair<Guid, string> temp = KeyValuePair.Create<Guid, string>(bill.Id, bill.Expense.Name);
                res.Add(temp);
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Bills found", Success = true});

        }

        // GET: api/Bills/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Bill? res = await _billService.GetBillById(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Bill not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Bill found", Success = true});
        }

        // POST: api/Bills
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bill bill)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            Bill? res = await _billService.AddUserBill(bill, userId);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Bill not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Bill created", Success = true});
        }

        // PUT: api/Bills/5
        [HttpPut]
        public async Task<IActionResult> Put(Guid id, [FromBody] Bill bill)
        {
            Bill? res = await _billService.UpdateBill(bill, id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Bill not updated", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Bill updated", Success = true});
        }

        // DELETE: api/Bills/5
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            Bill? res = await _billService.DeleteBill(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Bill not deleted", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Bill deleted", Success = true});
        }
    }
}