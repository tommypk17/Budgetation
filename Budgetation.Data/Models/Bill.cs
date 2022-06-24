using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Models
{
    public class UserBill
    {
        [BsonId]
        public Guid UserId { get; set; }
        public List<Bill> Bills { get; set; }
    }
    public class Bill
    {
        [BsonId]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Expense Expense { get; set; }
        [BsonIgnoreIfNull]
        public DateTime? Begin { get; set; } = null;
        [BsonIgnoreIfNull]
        public DateTime? Due { get; set; } = null;
        [BsonIgnoreIfNull]
        public bool Paid { get; set; }
        public string Reoccurrence { get; set; }
    }
}