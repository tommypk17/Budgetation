import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractExpense,
  eExpenseType,
  eIncomeType,
  eReoccurrence, RecurringExpense,
  SingleExpense
} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-edit-expense-block',
  templateUrl: './edit-expense-block.component.html',
  styleUrls: ['./edit-expense-block.component.scss']
})
export class EditExpenseBlockComponent implements OnInit {
  @Output('save') save: EventEmitter<SingleExpense | RecurringExpense> = new EventEmitter<SingleExpense | RecurringExpense>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('expense') expense: SingleExpense | RecurringExpense | undefined;

  invalid: boolean = true;

  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  reoccurs: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.expense.interval)
    if(this.expense.interval != undefined){
      this.reoccurs = true;
      this.expense = Object.assign(new RecurringExpense(), this.expense);
    }else{
      this.reoccurs = false;
      this.expense = Object.assign(new SingleExpense(), this.expense);
    }
    Object.values(eReoccurrence).filter((o) => typeof o == 'string').forEach((v) => {
      this.reoccurrences.push({key: eReoccurrence[v], value: v as string});
    });
    Object.values(eExpenseType).filter((o) => typeof o == 'string').forEach((v) => {
      this.expenseTypes.push({key: eExpenseType[v], value: v as string});
    });
  }

  public saveExpense(): void {
    this.save.next(this.expense);
  }

  public cancelEditExpense(): void {
    this.cancel.next();
  }
}
