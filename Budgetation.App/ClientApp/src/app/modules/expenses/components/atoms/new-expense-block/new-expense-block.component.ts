import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {
  AbstractExpense,
  eExpenseType,
  eReoccurrence, RecurringExpense, SingleExpense
} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";


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

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
  }

  public saveExpense(): void {
    if(this.expense.reoccurs){
      this.expense = Object.assign(new RecurringExpense(), this.expense);
    }
    else {
      delete this.expense.interval;
      this.expense = Object.assign(new SingleExpense(), this.expense);
    }
    this.save.next(this.expense);
  }

  public cancelNewExpense(): void {
    this.cancel.next();
  }

}
