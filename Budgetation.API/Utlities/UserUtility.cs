using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Http;

namespace Budgetation.API.Utlities
{
    public static class UserUtility
    {
        public static Guid GetCurrentUserId(IPrincipal principal)
        {
            try
            {
                ClaimsPrincipal claimsPrincipal = (ClaimsPrincipal) principal;
                var claims = claimsPrincipal.Claims.ToList();
                var res = Guid.Parse(claims.First(x => x.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value);
                return res;
            }
            catch (InvalidCastException)
            {
                throw new InvalidCastException("Could not cast IPrincipal to ClaimsPrincipal");
            }
        }
    }
}