using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Budgetation.API.Models
{
    public class ResponseModel
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = "";
        public object? Data { get; set; }
    }
}
