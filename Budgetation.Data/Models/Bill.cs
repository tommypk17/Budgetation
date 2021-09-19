using System;
using System.Diagnostics.CodeAnalysis;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Models
{
    public class Bill
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
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