using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models
{
    #nullable enable
    public class User
    {
        [BsonId]
        public Guid UserId { get; set; }

        public List<Role> Roles { get; set; } = new List<Role>() {new Role()};
        public List<UserIncome> Incomes { get; set; } = new List<UserIncome>();
    }

    public class UserIncome
    {
        [BsonId]
        public Guid Id { get; set; } = Guid.NewGuid();

        public double IncomingBalance { get; set; } = 0;
        public double Amount { get; set; } = 0;
        public string Type { get; set; } = null!;
        public DateTime Date { get; set; } = DateTime.Today;
    }
    
    public class UserExpense
    {
        [BsonId]
        public Guid UserId { get; set; }
        public List<SingleExpense> SingleExpenses { get; set; } = new List<SingleExpense>();
        public List<RecurringExpense> RecurringExpenses { get; set; } = new List<RecurringExpense>();
    }
}
