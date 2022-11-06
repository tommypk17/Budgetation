
using System;
using System.Runtime.Serialization;
using Mongo.DataAccess.Interfaces;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models
{
    [KnownType(typeof(SingleExpense))]
    [KnownType(typeof(RecurringExpense))]
    public abstract class AbstractExpense : IMongoObject
    {
        [BsonId]
        public Guid Id { get; set; } = Guid.NewGuid();

        [BsonRequired]
        public Guid UserId { get; set; }

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
        
        public static DateTime GetNextDueDate(EReoccurrence interval, DateTime date)
        {
            DateTime res = interval switch
            {
                EReoccurrence.Weekly => date.AddDays(7),
                EReoccurrence.Biweekly => date.AddDays(14),
                EReoccurrence.Monthly => date.AddMonths(1),
                EReoccurrence.Quarterly => date.AddMonths(3),
                EReoccurrence.Biquarterly => date.AddMonths(6),
                EReoccurrence.Yearly => date.AddYears(1),
                _ => date
            };
            return res;
        }
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