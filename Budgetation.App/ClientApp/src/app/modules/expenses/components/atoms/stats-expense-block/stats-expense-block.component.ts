import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AbstractExpense, eExpensesFor} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-stats-expense-block',
  templateUrl: './stats-expense-block.component.html',
  styleUrls: ['./stats-expense-block.component.scss']
})
export class StatsExpenseBlockComponent implements OnInit, OnChanges {

  @Input('expenses') expenses: AbstractExpense[] = [];
  @Output('show') show: EventEmitter<number> = new EventEmitter<number>();

  expenseTotal: number = this.getTotalOutgoing();

  expensesFor: KeyValue<number, string>[] = this.sharedService.expensesFor;
  showingExpenses: number = eExpensesFor.Current;

  constructor(private sharedService: SharedService) { }

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
    this.refreshTotal();
  }

  public refreshTotal(): void {
    this.expenseTotal = this.getTotalOutgoing();
  }

  showExpensesFor(expensesFor: number){
    this.show.next(expensesFor);
  }
}
