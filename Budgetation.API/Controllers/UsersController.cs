using System;
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
    public class UsersController : ControllerBase
    {
        private readonly IMongoLogic<User> _userLogic;
        private readonly IMongoLogic<Income> _incomeLogic;
        public UsersController(IMongoLogic<User> userLogic, IMongoLogic<Income> incomeLogic)
        {
            _userLogic = userLogic;
            _incomeLogic = incomeLogic;
        }
        // GET: api/Users/Income
        [HttpGet("income")]
        public async Task<IActionResult> Get()
        {
            var res = await _incomeLogic.Read();
            if (!res.Any())
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = null, Message = "No income found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel(){Data = res, Message = "Income found", Success = true});
        }
        
        // GET: api/Users/Income/5
        [HttpGet("income/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var res = await _incomeLogic.Find(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Income not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Income found", Success = true});
        }

        // POST: api/Users/income
        [HttpPost("income")]
        public async Task<IActionResult> Post([FromBody] Income income)
        {
            Income? res = await _incomeLogic.Create(income);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "User income not created", Success = false});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "User income created", Success = true});
        }

        // PUT: api/Users/Income
        [HttpPut("income")]
        public async Task<IActionResult> Put([FromBody] Income income)
        {
            Income? res = await _incomeLogic.Update(income);
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
            Income? res = await _incomeLogic.Delete(id);
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "User income not deleted", Success = false});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "User income deleted", Success = true});
        }
    }
}
