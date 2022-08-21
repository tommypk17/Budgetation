import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, TemplateRef,
  ViewChild
} from '@angular/core';
import {AbstractExpense, eExpensesFor} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";
import {MatSelect} from "@angular/material/select";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-stats-expense-block',
  templateUrl: './stats-expense-block.component.html',
  styleUrls: ['./stats-expense-block.component.scss']
})
export class StatsExpenseBlockComponent implements OnInit, OnChanges {

  @Input('expenses') expenses: AbstractExpense[] = [];
  @Output('show') show: EventEmitter<string> = new EventEmitter<string>();
  @Output('monthSelected') monthSelected: EventEmitter<Date> = new EventEmitter<Date>();

  expenseTotal: number = this.getTotalOutgoing();

  expensesFor: KeyValue<string, string>[] = this.sharedService.expensesFor;
  showingExpenses: string = eExpensesFor.Current;

  showingMonth: Date;

  showMonthPicker: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  public getTotalOutgoing(): number {
    let total: number = 0;
    this.expenses.forEach((v) => {
      total += v.amount;
    });
    return this.sharedService.moneyRound(total);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTotal();
  }

  public refreshTotal(): void {
    this.expenseTotal = this.getTotalOutgoing();
  }

  showExpensesFor(expensesFor: string){
    if(expensesFor == eExpensesFor.Month){
      this.showMonthPicker = true;
    }else{
      this.showMonthPicker = false;
    }
    this.show.next(expensesFor);
  }

  dateChanged(date: Date): void {
    this.monthSelected.next(date);
  }
}
