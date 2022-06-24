using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Budgetation.Data.Models
{
    public class User
    {
        [BsonId]
        public Guid UserId { get; set; }

        public List<Role> Roles { get; set; } = new List<Role>();
    }
}
