using System;
using Budgetation.Data.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Interfaces.IModels
{
    [BsonSerializer(typeof(ImpliedImplementationInterfaceSerializer<IRole, Role>))]
    public interface IRole
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
    }
}