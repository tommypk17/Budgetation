import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {
  AbstractExpense,
  eExpenseType,
  eReoccurrence, RecurringExpense, SingleExpense
} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";


@Component({
  selector: 'app-new-expense-block',
  templateUrl: './new-expense-block.component.html',
  styleUrls: ['./new-expense-block.component.scss']
})
export class NewExpenseBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<SingleExpense | RecurringExpense> = new EventEmitter<SingleExpense | RecurringExpense>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('expense') expense: SingleExpense | RecurringExpense | undefined;

  invalid: boolean = true;

  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  reoccurs: boolean = false;

  constructor() { }

  ngOnInit(): void {
    Object.values(eReoccurrence).filter((o) => typeof o == 'string').forEach((v) => {
      this.reoccurrences.push({key: eReoccurrence[v], value: v as string});
    });
    Object.values(eExpenseType).filter((o) => typeof o == 'string').forEach((v) => {
      this.expenseTypes.push({key: eExpenseType[v], value: v as string});
    });
  }

  public changeReoccurs(reoccurs: boolean) {
    if(reoccurs){
      this.expense = Object.assign(new RecurringExpense(), this.expense);
      this.expense.due = undefined;
      this.expense.interval = undefined;
      this.expense.reoccurrenceId = undefined;
    }else{
      delete this.expense.interval;
      delete this.expense.due;
      delete this.expense.reoccurrenceId;
      this.expense = Object.assign(new SingleExpense(), this.expense);
    }
  }

  public saveExpense(): void {
    this.reoccurs = false;
    this.save.next(this.expense);
  }

  public cancelNewExpense(): void {
    this.cancel.next();
  }

  clearReoccur(){
    if(this.reoccurs) {
      this.expense.begin = null;
    }
  }

}
