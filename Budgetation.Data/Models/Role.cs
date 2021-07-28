﻿using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Budgetation.Data.Interfaces.IModels;

namespace Budgetation.Data.Models
{
    public class Role : IRole
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [DefaultValue(true)]
        public bool Active { get; set; } = true;
    }
}
