using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Budgetation.Data.DAL;
using Budgetation.Data.Models;
using Budgetation.Logic.Utlities;
using Microsoft.AspNetCore.Http;
using Mongo.DataAccess.Interfaces;
using MongoDB.Driver;

namespace Budgetation.Logic.Controllers;

public class IncomeLogic : IMongoLogic<Income>
{
    private readonly IMongoCollection<Income> _userIncomes;
    private IHttpContextAccessor _httpContextAccessor;
    
    public IncomeLogic(IDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        var ctx = dbContext;
        _userIncomes = ctx.Database.GetCollection<Income>("userIncome");

        _httpContextAccessor = httpContextAccessor;
    }
    
    public async Task<IList<Income>> Read()
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<Income>.Filter.Eq(x => x.UserId, userId);
        var incomes = await _userIncomes.FindAsync(filter);
        return await incomes.ToListAsync();
    }

    public async Task<Income?> Find(Guid id)
    {
        var filter = Builders<Income>.Filter.Eq(x => x.Id, id);
        var income = await _userIncomes.FindAsync(filter);
        return await income.FirstOrDefaultAsync();
    }
    
    public async Task<Income?> Create(Income t)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        t.Date = new DateTime(t.Date.Year, t.Date.Month, t.Date.Day);
        t.UserId = userId;
        await _userIncomes.InsertOneAsync(t);
        
        return await Find(t.Id);
    }
    
    public async Task<Income?> Update(Income t)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<Income>.Filter.Eq(x => x.Id, t.Id) & Builders<Income>.Filter.Eq(x => x.UserId, userId);
        await _userIncomes.ReplaceOneAsync(filter, t);
        return await Find(t.Id);
    }

    public async Task<Income?> Delete(Guid id)
    {
        var userId = UserUtility.GetCurrentUserId(_httpContextAccessor.HttpContext.User);
        var filter = Builders<Income>.Filter.Eq(x => x.Id, id) & Builders<Income>.Filter.Eq(x => x.UserId, userId);
        var income = await Find(id);
        
        //need to return null if delete is unsuccessful
        await _userIncomes.DeleteOneAsync(filter);
        return income;
    }
}