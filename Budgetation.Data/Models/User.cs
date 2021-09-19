using System;
using System.Collections.Generic;

namespace Budgetation.Data.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public List<Role> Roles { get; set; }
        public DateTime LastLogin { get; set; }
    }
}
