using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models;

public class BudgetExpense
{
    [BsonId]
    public Guid Id { get; set; } = Guid.NewGuid();
    [BsonRequired]
    public string Name { get; set; } = String.Empty;
    [BsonRequired]
    public double Amount { get; set; } = 0;

    [BsonIgnoreIfNull]
    public BudgetExpenseType? Type { get; set; }
}

public enum BudgetExpenseType
{
    Need,
    Want,
    Extra
}