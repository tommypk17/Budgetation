using Budgetation.Data.Models;
using MongoDB.Driver;

namespace Budgetation.Data.DAL;

public interface IDbContext
{
    public IMongoDatabase Database { get; }
}

public class DbContext : IDbContext
{
    public IMongoDatabase Database { get; }
    public DbContext(IDatabaseSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        Database = client.GetDatabase(settings.DatabaseName);
    }

}