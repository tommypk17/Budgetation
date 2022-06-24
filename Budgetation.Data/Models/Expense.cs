
namespace Budgetation.Data.Models
{
    public class Expense
    {
        public string Name { get; set; } = null!;
        public double Amount { get; set; } = 0;
        public string Type { get; set; } = null!;
    }
}