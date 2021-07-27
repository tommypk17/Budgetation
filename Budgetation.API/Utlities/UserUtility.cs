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
        public static Guid GetCurrentUserID(IPrincipal principal)
        {
            Guid res;
            List<Claim> claims = new List<Claim>();
            try
            {
                ClaimsPrincipal claimsPrincipal = (ClaimsPrincipal) principal;
                claims = claimsPrincipal.Claims.ToList();
                res = Guid.Parse(claims.FirstOrDefault(x => x.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value);
            }
            catch (InvalidCastException ex)
            {
                throw new InvalidCastException("Could not cast IPrincipal to ClaimsPrincipal");
            }

            if (res != null)
            {
                return res;
            }

            throw new NullReferenceException("Could not gather User ID");
        }
    }
}