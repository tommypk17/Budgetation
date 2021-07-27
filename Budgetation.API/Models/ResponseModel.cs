using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Budgetation.API.Models
{
    public class ResponseModel
    {
        public bool success { get; set; }
        public string message { get; set; }
        public object data { get; set; }
    }
}
