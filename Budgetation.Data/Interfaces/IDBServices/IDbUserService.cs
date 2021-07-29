using System;
using System.Collections.Generic;
using Budgetation.Data.Models;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbUserService
    {
        public User Create(User user);
        public IList<User> Read();
        public User Find(Guid id);
        public User Update(User user);
        public User Delete(Guid id);
    }
}