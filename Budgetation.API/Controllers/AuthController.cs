using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Budgetation.API.Models;
using Budgetation.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Budgetation.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        
        [HttpGet("login")]
        public async Task<IActionResult> Login()
        {
            ResponseModel res = new ResponseModel();
            res.success = false;
            res.message = "Unable to log user in";
            try
            {
                res.data = await _authService.Login(User);
                res.message = "User logged in";
                res.success = true;
            }
            catch (NullReferenceException ex)
            {
                res.message = "User info corrupt or unable to be parsed, login failed";
                return StatusCode(StatusCodes.Status500InternalServerError, res);
            }
            catch (InvalidCastException ex)
            {
                res.message = "User info corrupt or unable to be parsed, login failed";
                return StatusCode(StatusCodes.Status500InternalServerError, res);
            }
            return StatusCode(StatusCodes.Status200OK, res);

        }
        [HttpGet("profile")]
        public async Task<IActionResult> Profile()
        {
            ResponseModel res = new ResponseModel();
            res.success = false;
            res.message = "Unable to obtain user info";
            try
            {
                res.data = await _authService.Profile(User);
                res.message = "User info obtained";
                res.success = true;
            }
            catch (NullReferenceException ex)
            {
                res.message = "User info corrupt or unable to be parsed";
                return StatusCode(StatusCodes.Status500InternalServerError, res);
            }
            catch (InvalidCastException ex)
            {
                res.message = "User info corrupt or unable to be parsed";
                return StatusCode(StatusCodes.Status500InternalServerError, res);
            }
            return StatusCode(StatusCodes.Status200OK, res);

        }
        
    }
}
