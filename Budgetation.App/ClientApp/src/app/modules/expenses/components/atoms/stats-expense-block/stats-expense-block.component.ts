import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractExpense} from "../../../../../models/financial";

@Component({
  selector: 'app-stats-expense-block',
  templateUrl: './stats-expense-block.component.html',
  styleUrls: ['./stats-expense-block.component.scss']
})
export class StatsExpenseBlockComponent implements OnInit, OnChanges {

  @Input('expenses') expenses: AbstractExpense[] = [];

  expenseTotal: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public getTotalOutgoing(): number {
    let total: number = 0;
    this.expenses.forEach((v) => {
      total += v.amount;
    });
    return total;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.expenseTotal = this.getTotalOutgoing();
  }
}
