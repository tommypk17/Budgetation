using Budgetation.Data.Models;
using Mongo.DataAccess.Interfaces;
using MongoDB.Driver;

namespace Budgetation.Data.DAL;

public class DbContext : IDbContext
{
    public IMongoDatabase Database { get; }
    public DbContext(IDatabaseSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        Database = client.GetDatabase(settings.DatabaseName);
    }

}