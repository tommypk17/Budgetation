using System;
using System.Collections.Generic;
using Budgetation.Data.Interfaces.IModels;

namespace Budgetation.Data.Models
{
    public class User : IUser
    {
        public Guid Id { get; set; }
        public List<IRole> Roles { get; set; }
    }
}
