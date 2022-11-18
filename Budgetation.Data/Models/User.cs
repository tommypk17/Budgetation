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

        public Role Role { get; set; } = new Role();
        public Dictionary<string, string> Preferences { get; set; } = new Dictionary<string, string>();
    }
}
