﻿using System;
using System.Collections.Generic;

namespace Budgetation.Data.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public List<Role> Roles { get; set; }
    }
}
