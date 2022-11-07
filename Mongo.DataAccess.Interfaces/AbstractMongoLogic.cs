using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces.Utilities;
using MongoDB.Driver;

namespace Mongo.DataAccess.Interfaces;

public abstract class AbstractMongoLogic<T> : IMongoLogic<T> where T : class, IMongoObject
{
    protected readonly IMongoCollection<T> Collection;
    protected readonly IHttpContextAccessor HttpContextAccessor;
    
    public AbstractMongoLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        var ctx = dbContext;
        Collection = ctx.Database.GetCollection<T>(typeof(T).Name);
        HttpContextAccessor = httpContextAccessor;
    }
    
    public async Task<IList<T>> Read()
    {
        var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.UserId, userId);
        var items = await Collection.FindAsync(filter);
        return await items.ToListAsync();
    }
    
    public virtual async Task<T?> Single()
    {
        var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.UserId, userId);
        var items = await Collection.FindAsync(filter);
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
        var item = await Collection.FindAsync(filter);
        return await item.FirstOrDefaultAsync();
    }
    
    public async Task<T?> Create(T t)
    {
        var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
        t.UserId = userId;
        await Collection.InsertOneAsync(t);
        
        return await Find(t.Id);
    }

    public async Task<IList<T>> BulkCreate(IList<T> t)
    {
        var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
        foreach (T item in t)
        {
            item.UserId = userId;
        }
        await Collection.InsertManyAsync(t);

        var filter = Builders<T>.Filter.In(x => x.Id, t.Select(y => y.Id));
        var items = await Collection.FindAsync(filter);
        return await items.ToListAsync();
    }

    public async Task<T?> Update(T t)
    {
        var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.Id, t.Id) & Builders<T>.Filter.Eq(x => x.UserId, userId);
        await Collection.ReplaceOneAsync(filter, t);
        return await Find(t.Id);
    }

    public async Task<T?> Delete(Guid id)
    {
        var userId = UserUtility.GetCurrentUserId(HttpContextAccessor.HttpContext.User);
        var filter = Builders<T>.Filter.Eq(x => x.Id, id) & Builders<T>.Filter.Eq(x => x.UserId, userId);
        var income = await Find(id);
        
        //need to return null if delete is unsuccessful
        await Collection.DeleteOneAsync(filter);
        return income;
    }
}