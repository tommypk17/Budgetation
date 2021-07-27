using System;
using System.Collections.Generic;
using Budgetation.Data.Interfaces.IModels.Auth;

namespace Budgetation.Data.Models.Auth
{
    public class User : IUser
    {
        public Guid Id { get; set; }
        public List<IRole> Roles { get; set; }
    }
}
