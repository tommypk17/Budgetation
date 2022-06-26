using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Budgetation.Data.Models
{
    public class Role
    {
        [DefaultValue("basic")]
        [Required] public string Name { get; set; } = "basic";
        [Required]
        [DefaultValue(true)]
        public bool Active { get; set; } = true;
    }
}
