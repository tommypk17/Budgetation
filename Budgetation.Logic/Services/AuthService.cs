using Budgetation.Logic.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Budgetation.Data.Interfaces;
using Budgetation.Data.Models;
using Budgetation.Logic.Models.Auth;

namespace Budgetation.Logic.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        public AuthService(IUserService userService)
        {
            _userService = userService;
        }
        /**
         * <summary>Takes the IPrincipal that initiated the call, returns the token claims as a AuthUser. If user is new, add to DB for tracking as a User</summary>
         * <seealso cref="AuthUser"/>
         * <seealso cref="User"/>
         * <exception cref="NullReferenceException"></exception>
         * <exception cref="InvalidCastException"></exception>
         */
        public async Task<AuthUser> Login(IPrincipal principal)
        {
            List<Claim> claims;
            AuthUser result = new AuthUser();
            try
            {
                ClaimsPrincipal claimsPrincipal = (ClaimsPrincipal) principal;
                claims = claimsPrincipal.Claims.ToList();
            }
            catch (InvalidCastException ex)
            {
                throw new InvalidCastException("Could not cast IPrincipal to ClaimsPrincipal");
            }

            try
            {
                result.Id = Guid.Parse(claims.FirstOrDefault(x => x.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value);
                result.Email = claims.FirstOrDefault(x => x.Type == "emails").Value;
                result.FirstName = claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName).Value;
                result.LastName = claims.FirstOrDefault(x => x.Type == ClaimTypes.Surname).Value;
            }
            catch (NullReferenceException ex)
            {
                throw new NullReferenceException("Value not found for specific Claim");
            }

            User user = (User)_userService.Find(result.Id);
            if (user == null)
            {
                user = new User();
                user.Id = result.Id;
                _userService.Create(user);
            }

            return result;
        }

        public async Task<AuthUser> Profile(IPrincipal principal)
        {
            List<Claim> claims;
            AuthUser result = new AuthUser();
            try
            {
                ClaimsPrincipal claimsPrincipal = (ClaimsPrincipal) principal;
                claims = claimsPrincipal.Claims.ToList();
            }
            catch (InvalidCastException ex)
            {
                throw new InvalidCastException("Could not cast IPrincipal to ClaimsPrincipal");
            }

            try
            {
                result.Id = Guid.Parse(claims.FirstOrDefault(x => x.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value);
                result.Email = claims.FirstOrDefault(x => x.Type == "emails").Value;
                result.FirstName = claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName).Value;
                result.LastName = claims.FirstOrDefault(x => x.Type == ClaimTypes.Surname).Value;
            }
            catch (NullReferenceException ex)
            {
                throw new NullReferenceException("Value not found for specific Claim");
            }

            return result;
        }
    }
}
