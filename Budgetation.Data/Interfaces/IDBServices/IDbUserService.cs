using System;
using System.Collections.Generic;
using Budgetation.Data.Interfaces.IModels;

namespace Budgetation.Data.Interfaces.IDBServices
{
    public interface IDbUserService
    {
        public IUser Create(IUser user);
        public IList<IUser> Read();
        public IUser Find(Guid id);
        public IUser Update(IUser user);
        public IUser Delete(Guid id);
    }
}