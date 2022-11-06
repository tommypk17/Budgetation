using System;
using System.Collections.Generic;
using Mongo.DataAccess.Interfaces;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models
{
    #nullable enable
    public class User : IMongoObject
    {
        [BsonId]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public List<Role> Roles { get; set; } = new List<Role>() {new Role()};
        public List<UserPreference> Preferences { get; set; } = new List<UserPreference>();
    }

    public class UserExpense
    {
        [BsonId]
        public Guid UserId { get; set; }
        public List<SingleExpense> SingleExpenses { get; set; } = new List<SingleExpense>();
        public List<RecurringExpense> RecurringExpenses { get; set; } = new List<RecurringExpense>();
    }

    public class UserPreference
    {
        [BsonId]
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Key { get; set; } = String.Empty;
        public string Value { get; set; } = String.Empty;
    }
}
