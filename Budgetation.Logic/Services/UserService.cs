using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading.Tasks;
using Budgetation.Data.Interfaces.IDBServices;
using Budgetation.Data.Models;
using Budgetation.Logic.Services.Interfaces;

namespace Budgetation.Logic.Services
{
    public class UserService : IUserService
    {
        private readonly IDbUserService _dbUserService;
        private readonly IDbUserIncomeService _dbUserIncomeService;
        public UserService(IDbUserService dbUserService, IDbUserIncomeService dbUserIncomeService)
        {
            _dbUserService = dbUserService;
            _dbUserIncomeService = dbUserIncomeService;
        }


        public async Task<User> GetUserById(Guid userId)
        {
            return await _dbUserService.Find(userId);
        }
        
        public async Task<UserIncome?> GetUserIncome(Guid userId, Guid id)
        {
            return await _dbUserIncomeService.Find(userId, id);
        }

        public async Task<List<UserIncome>> GetAllUserIncomes(Guid userId)
        {
            return await _dbUserIncomeService.Read(userId);
        }

        public async Task<UserIncome?> AddUserIncome(Guid userId, UserIncome income)
        {
            return await _dbUserIncomeService.Create(userId, income);
        }

        public async Task<UserIncome?> UpdateUserIncome(Guid userId, UserIncome income)
        {
            return await _dbUserIncomeService.Update(userId, income);
        }

        public async Task<UserIncome?> DeleteUserIncome(Guid userId, Guid id)
        {
            return await _dbUserIncomeService.Delete(userId, id);
        }
    }
}