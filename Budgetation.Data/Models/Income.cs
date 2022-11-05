using System;
using Mongo.DataAccess.Interfaces;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models;

public class Income : IMongoObject
{
    [BsonId]
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; } = Guid.Empty;
    public double IncomingBalance { get; set; } = 0;
    public double Amount { get; set; } = 0;
    public int Type { get; set; } = 0;
    public DateTime Date { get; set; } = DateTime.Today;
}