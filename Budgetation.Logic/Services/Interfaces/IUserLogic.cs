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
        public Task<UserIncome?> GetUserIncome(Guid userId, Guid id);
        public Task<List<UserIncome>> GetAllUserIncomes(Guid userId);
        public Task<User> UpdateUser(User user);

        public Task<UserIncome?> AddUserIncome(Guid userId, UserIncome income);
        public Task<UserIncome?> UpdateUserIncome(Guid userId, UserIncome income);
        public Task<List<UserPreference>> GetUserPreferences(Guid userId);
        public Task<List<UserPreference>> UpdateUserPreferences(Guid userId, UserPreference preference);


        public Task<UserIncome?> DeleteUserIncome(Guid userId, Guid id);
    }
}