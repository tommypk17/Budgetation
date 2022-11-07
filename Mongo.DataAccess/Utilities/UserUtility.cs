using System.Security.Claims;
using System.Security.Principal;

namespace Mongo.DataAccess.Interfaces.Utilities
{
    public static class UserUtility
    {
        public static Guid GetCurrentUserId(IPrincipal? principal)
        {
            if (principal is null) return Guid.Empty;
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