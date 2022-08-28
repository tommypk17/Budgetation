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
    public class UserPreferencesController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserPreferencesController(IUserService userService)
        {
            _userService = userService;
        }
        // GET: api/UsersPreferences
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<UserPreference> res = await _userService.GetUserPreferences(userId);
            if (res.Count <= 0)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No preferences not found", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Preferences found", Success = true});
        }
        // PUT: api/UsersPreferences
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UserPreference preference)
        {
            Guid userId = UserUtility.GetCurrentUserId(User);
            List<UserPreference> res = await _userService.UpdateUserPreferences(userId, preference);
            if (res.Count <= 0)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "Could not update preferences", Success = true});
            }
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res, Message = "Preferences updated", Success = true});
        }
    }
}
