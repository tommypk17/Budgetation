using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Budgetation.Logic.Models.Auth;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IAuthService
    {
        /**
         * <exception cref="NullReferenceException"></exception>
         * <exception cref="InvalidCastException"></exception>
         */
        public Task<AuthUser> Login(IPrincipal principal);
        /**
         * <exception cref="NullReferenceException"></exception>
         * <exception cref="InvalidCastException"></exception>
         */
        public Task<AuthUser> Profile(IPrincipal principal);
    }
}
