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
    public class UserPreferencesController : ControllerBase
    {
        private readonly IMongoLogic<User> _userLogic;
        public UserPreferencesController(IMongoLogic<User> userLogic)
        {
            _userLogic = userLogic;
        }
        // GET: api/UserPreferences
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            User? res = await _userLogic.Single();
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No user not found", Success = true});
            }

            Dictionary<string, string> preferences = res.Preferences;
            
            if(preferences.Count > 0) return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res.Preferences.ToList(), Message = "Preferences found", Success = true});
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No preferences not found", Success = true});
            
        }
        // PUT: api/UserPreferences/{preferenceKey}
        [HttpPut("{preferenceKey}")]
        public async Task<IActionResult> Put([FromRoute] string preferenceKey, [FromBody] KeyValuePair<string, string> preference)
        {
            User? res = await _userLogic.Single();
            if (res is null)
            {
                return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No user not found", Success = true});
            }

            Dictionary<string, string> preferences = res.Preferences;
            preferences[preferenceKey] = preference.Value;
            
            User? updated = await _userLogic.Update(res);
            
            if(updated is not null) return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = res.Preferences.ToList(), Message = "Preferences updated", Success = true});
            return StatusCode(StatusCodes.Status200OK, new ResponseModel() {Data = null, Message = "No preferences updated", Success = false});
        }
    }
}
