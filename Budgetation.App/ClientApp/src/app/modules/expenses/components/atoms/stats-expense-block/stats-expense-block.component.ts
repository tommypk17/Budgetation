import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {iBill} from "../../../../../models/financial";

@Component({
  selector: 'app-stats-expense-block',
  templateUrl: './stats-expense-block.component.html',
  styleUrls: ['./stats-expense-block.component.scss']
})
export class StatsExpenseBlockComponent implements OnInit, OnChanges {

  @Input('bills') bills: iBill[] = [];

  expenseTotal: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public getTotalOutgoing(): number {
    let total: number = 0;
    this.bills.forEach((v) => {
      total += v.expense.amount;
    });
    return total;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.expenseTotal = this.getTotalOutgoing();
  }
}
