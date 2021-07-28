using System;
using Budgetation.Data.Interfaces.IModels;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Models
{
    [BsonSerializer(typeof(ImpliedImplementationInterfaceSerializer<IBill, Bill>))]
    public class Bill : IBill
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