using System;
using System.Collections.Generic;
using Budgetation.Data.Models.Auth;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Interfaces.IModels.Auth
{
    [BsonSerializer(typeof(ImpliedImplementationInterfaceSerializer<IUser, User>))]
    public interface IUser
    {
        public Guid Id { get; set; }
        public List<IRole> Roles { get; set; } 
    }
}