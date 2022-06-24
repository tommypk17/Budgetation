using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Budgetation.Data.Models
{
    public class Role
    {
        [Required] public string Name { get; set; } = null!;
        [Required]
        [DefaultValue(true)]
        public bool Active { get; set; } = true;
    }
}
