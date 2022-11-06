using System;
using System.Collections.Generic;
using Mongo.DataAccess.Interfaces;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models;
public class Budget : IMongoObject
{
    [BsonId] public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public bool IsWhatIf { get; set; } = true;
    public double Salary { get; set; } = 0;
    public double NetMonthlyPay { get; set; } = 0;
    public double? NetMonthlyDeductions { get; set; } = 0;
    public List<BudgetExpense> Expenses { get; set; } = new List<BudgetExpense>();
}
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