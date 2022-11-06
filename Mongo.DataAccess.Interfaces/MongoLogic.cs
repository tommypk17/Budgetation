using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces.Utilities;
using MongoDB.Driver;

namespace Mongo.DataAccess.Interfaces;

public abstract class MongoLogic<T> : IMongoLogic<T> where T : class, IMongoObject
{
    private readonly IMongoCollection<T> _collection;
    private readonly IHttpContextAccessor _httpContextAccessor;
    
    public MongoLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        var ctx = dbContext;
        _collection = ctx.Database.GetCollection<T>(typeof(T).Name);
        _httpContextAccessor = httpContextAccessor;
    }
    
    public async Task<IList<T>> Read()
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.UserId, userId);
        var items = await _collection.FindAsync(filter);
        return await items.ToListAsync();
    }
    
    public async Task<T?> Single()
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.UserId, userId);
        var items = await _collection.FindAsync(filter);
        try
        {
            return await items.SingleAsync();
        }
        catch (Exception)
        {
            return await items.FirstOrDefaultAsync();
        }
    }

    public async Task<T?> Find(Guid id)
    {
        var filter = Builders<T>.Filter.Eq(x => x.Id, id);
        var item = await _collection.FindAsync(filter);
        return await item.FirstOrDefaultAsync();
    }
    
    public async Task<T?> Create(T t)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        t.UserId = userId;
        await _collection.InsertOneAsync(t);
        
        return await Find(t.Id);
    }

    public async Task<IList<T>> BulkCreate(IList<T> t)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        foreach (T item in t)
        {
            item.UserId = userId;
        }
        await _collection.InsertManyAsync(t);

        var filter = Builders<T>.Filter.In(x => x.Id, t.Select(y => y.Id));
        var items = await _collection.FindAsync(filter);
        return await items.ToListAsync();
    }

    public async Task<T?> Update(T t)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.Id, t.Id) & Builders<T>.Filter.Eq(x => x.UserId, userId);
        await _collection.ReplaceOneAsync(filter, t);
        return await Find(t.Id);
    }

    public async Task<T?> Delete(Guid id)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.Id, id) & Builders<T>.Filter.Eq(x => x.UserId, userId);
        var income = await Find(id);
        
        //need to return null if delete is unsuccessful
        await _collection.DeleteOneAsync(filter);
        return income;
    }
}