import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractExpense,
  eExpenseType,
  eIncomeType,
  eReoccurrence, RecurringExpense,
  SingleExpense
} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";

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

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    if(this.expense.interval != undefined){
      this.reoccurs = true;
      this.expense = Object.assign(new RecurringExpense(), this.expense);
    }else{
      this.reoccurs = false;
      this.expense = Object.assign(new SingleExpense(), this.expense);
    }
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
  }

  public saveExpense(): void {
    this.save.next(this.expense);
  }

  public cancelEditExpense(): void {
    this.cancel.next();
  }
}
