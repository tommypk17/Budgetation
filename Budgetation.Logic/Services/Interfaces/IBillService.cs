using System;
using System.Collections.Generic;
using System.Security.Principal;
using Budgetation.Data.Interfaces.IModels;

namespace Budgetation.Logic.Services.Interfaces
{
    public interface IBillService
    {
        public List<IBill> GetAllUserBills(Guid userId);
    }
}