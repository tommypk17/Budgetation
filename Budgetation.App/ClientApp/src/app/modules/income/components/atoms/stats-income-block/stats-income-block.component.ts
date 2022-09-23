import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractExpense, Income} from "../../../../../models/financial";

@Component({
  selector: 'app-stats-income-block',
  templateUrl: './stats-income-block.component.html',
  styleUrls: ['./stats-income-block.component.scss']
})
export class StatsIncomeBlockComponent implements OnInit, OnChanges {
  @Input('income') income: Income[] = [];
  incomeTotal: number = this.getTotalIncoming();
  constructor() { }

  ngOnInit(): void {
  }

  public getTotalIncoming(): number {
    let total: number = 0;
    this.income.forEach((v) => {
      total += v.amount;
    });
    return total;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTotal();
  }

  public refreshTotal(): void {
    this.incomeTotal = this.getTotalIncoming();
  }

}
