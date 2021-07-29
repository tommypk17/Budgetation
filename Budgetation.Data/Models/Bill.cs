using System;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Models
{
    public class Bill
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Expense Expense { get; set; }
        public DateTime Begin { get; set; }
        public DateTime Due { get; set; }
        public bool Paid { get; set; }
        public string Reoccurrence { get; set; }
    }
}