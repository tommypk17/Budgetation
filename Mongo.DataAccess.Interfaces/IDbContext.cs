using MongoDB.Driver;

namespace Mongo.DataAccess.Interfaces;

public interface IDbContext
{
    public IMongoDatabase Database { get; }
}