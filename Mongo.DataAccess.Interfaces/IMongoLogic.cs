namespace Mongo.DataAccess.Interfaces;

public interface IMongoLogic<T> where T : IMongoObject
{
    public Task<IList<T>> Read();
    public Task<T?> Find(Guid id);
    public Task<T?> Create(T t);
    public Task<T?> Update(T t);
    public Task<T?> Delete(Guid id);
}