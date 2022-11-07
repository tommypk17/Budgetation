using MongoDB.Bson.Serialization.Attributes;

namespace Mongo.DataAccess.Interfaces;

public interface IMongoObject
{
    [BsonId]
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
}