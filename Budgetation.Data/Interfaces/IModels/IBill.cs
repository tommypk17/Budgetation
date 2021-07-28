using System;

namespace Budgetation.Data.Interfaces.IModels
{
    public interface IBill
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public IExpense Expense { get; set; }
        public DateTime Begin { get; set; }
        public DateTime Due { get; set; }
        public bool Paid { get; set; }
        public string Reoccurrence { get; set; }
    }
}