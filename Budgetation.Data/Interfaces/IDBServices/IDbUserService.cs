using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbUserService
    {
        #nullable enable
        public Task<User> Create(User user);
        public Task<IList<User>> Read();
        public Task<User> Find(Guid id);
        public Task<User> Update(User user);
        public Task<User?> Delete(Guid id);
    }
}