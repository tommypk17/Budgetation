import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractExpense, eExpensesFor, eIncomeFor, Income} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";

@Component({
  selector: 'app-stats-income-block',
  templateUrl: './stats-income-block.component.html',
  styleUrls: ['./stats-income-block.component.scss']
})
export class StatsIncomeBlockComponent implements OnInit, OnChanges {
  @Input('income') income: Income[] = [];
  @Output('show') show: EventEmitter<string> = new EventEmitter<string>();
  @Output('monthSelected') monthSelected: EventEmitter<Date> = new EventEmitter<Date>();

  incomeTotal: number = this.getTotalIncoming();

  expensesFor: KeyValue<string, string>[] = this.sharedService.incomeFor;
  showingExpenses: string = eExpensesFor.Current;

  showingMonth: Date;

  showMonthPicker: boolean = false;

  constructor(private sharedService: SharedService) { }

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

  showIncomeFor(incomeFor: string){
    if(incomeFor == eIncomeFor.Month){
      this.showMonthPicker = true;
    }else{
      this.showMonthPicker = false;
    }
    this.show.next(incomeFor);
  }

  dateChanged(date: Date): void {
    this.monthSelected.next(date);
  }

  public refreshTotal(): void {
    this.incomeTotal = this.getTotalIncoming();
  }

}
