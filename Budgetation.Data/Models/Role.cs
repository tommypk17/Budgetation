using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Budgetation.Data.Models
{
    public class Role
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [DefaultValue(true)]
        public bool Active { get; set; } = true;
    }
}
