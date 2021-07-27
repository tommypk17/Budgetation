using System;
using System.Collections.Generic;
using Budgetation.Data.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Interfaces.IModels
{
    [BsonSerializer(typeof(ImpliedImplementationInterfaceSerializer<IUser, User>))]
    public interface IUser
    {
        public Guid Id { get; set; }
        public List<IRole> Roles { get; set; } 
    }
}