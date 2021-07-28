namespace Budgetation.Data.Interfaces.IModels
{
    public interface IExpense
    {
        public string Name { get; set; }
        public double Amount { get; set; }
        public string ExpenseType { get; set; }
    }
}