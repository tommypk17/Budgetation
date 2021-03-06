
using System;
using System.Runtime.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models
{
    [KnownType(typeof(SingleExpense))]
    [KnownType(typeof(RecurringExpense))]
    public abstract class AbstractExpense
    {
        [BsonId]
        public Guid Id { get; set; } = Guid.NewGuid();
        [BsonRequired]
        public string Name { get; set; } = null!;
        [BsonRequired]
        public double Amount { get; set; } = 0;
        [BsonRequired]
        public EExpenseType Type { get; set; }
        public DateTime? PaidOn { get; set; } = null;
        public DateTime Due { get; set; } = DateTime.Today;

    }

    public class SingleExpense : AbstractExpense
    {
        
    }
    
    public class RecurringExpense : AbstractExpense
    {
        public Guid ReoccurrenceId { get; set; } = Guid.NewGuid();
        [BsonRequired]
        public EReoccurrence Interval { get; set; }
    }

    public enum EExpenseType
    {
        Need,
        Want,
        Extra
    }
    
    public enum EReoccurrence
    {
        Weekly,
        Biweekly,
        Monthly,
        Quarterly,
        Biquarterly,
        Yearly,
    }
}