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

  reoccurs: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
  }

  public changeReoccurs(reoccurs: boolean) {
    if(reoccurs){
      this.expense = Object.assign(new RecurringExpense(), this.expense);
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
