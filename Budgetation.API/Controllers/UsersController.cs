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
    public class UsersController : ControllerBase
    {
        private readonly IUserLogic _userLogic;
        public UsersController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }
        // GET: api/Users/Income
        [HttpGet("income")]
        public async Task<IActionResult> Get()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<UserIncome> incomes = await _userLogic.GetAllUserIncomes(userId);
            if (!incomes.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No income found", Success = true});
            }
            List<UserIncome> res = incomes.ToList();
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = res, Message = "Income found", Success = true});

        }
        
        // GET: api/Users/Income/5
        [HttpGet("income/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            UserIncome? res = await _userLogic.GetUserIncome(userId, id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Income not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Income found", Success = true});
        }

        // POST: api/Users/income
        [HttpPost("income")]
        public async Task<IActionResult> Post([FromBody] UserIncome income)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            UserIncome? res = await _userLogic.AddUserIncome(userId, income);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "User income not created", Success = false});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "User income created", Success = true});
        }

        // PUT: api/Users/Income
        [HttpPut("income")]
        public async Task<IActionResult> Put([FromBody] UserIncome income)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            UserIncome? res = await _userLogic.UpdateUserIncome(userId, income);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "User income not updated", Success = false});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "User income updated", Success = true});
        }

        // DELETE: api/Users/Income/5
        [HttpDelete("income/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            UserIncome? res = await _userLogic.DeleteUserIncome(userId, id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "User income not deleted", Success = false});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "User income deleted", Success = true});
        }
    }
}
