using System;
using Budgetation.Data.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

namespace Budgetation.Data.Interfaces.IModels
{
    public interface IRole
    {
        public string Name { get; set; }
        public bool Active { get; set; }
    }
}