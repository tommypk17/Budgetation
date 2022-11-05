using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IUserLogic
    {
        public Task<User> GetUserById(Guid userId);
        public Task<User> UpdateUser(User user);
        public Task<List<UserPreference>> GetUserPreferences(Guid userId);
        public Task<List<UserPreference>> UpdateUserPreferences(Guid userId, UserPreference preference);

    }
}