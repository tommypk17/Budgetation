import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractExpense, eExpenseType, eIncomeType, eReoccurrence} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-edit-expense-block',
  templateUrl: './edit-expense-block.component.html',
  styleUrls: ['./edit-expense-block.component.scss']
})
export class EditExpenseBlockComponent implements OnInit {
  @Output('save') save: EventEmitter<AbstractExpense> = new EventEmitter<AbstractExpense>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('expense') expense: AbstractExpense| undefined;

  invalid: boolean = true;

  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  constructor() { }

  ngOnInit(): void {
    Object.keys(eReoccurrence).forEach((v) => {
      this.reoccurrences.push({key: eReoccurrence[v], value: v});
    })
    Object.keys(eExpenseType).forEach((v) => {
      this.expenseTypes.push({key: eExpenseType[v], value: v});
    })
  }

  public saveExpense(): void {
    if(this.expense.reoccurrence == eReoccurrence.Single){
      this.expense.begin = null;
    }
    this.save.next(this.expense);
  }

  public cancelNewExpense(): void {
    this.cancel.next();
  }

  clearReoccur(reoccurrence: eReoccurrence){
    if(reoccurrence == eReoccurrence.Single) {
      this.expense.begin = null;
    }
  }

  public checkValid(): void {
    let keys = Object.keys(this.expense);
    this.invalid = false;
    keys.forEach((v, i, a) => {
      if(this.expense[v] == null || this.expense[v] == undefined){
        if(v != 'begin' && v != 'paid' && v != 'paidOn'){
          this.invalid = true;
        }
      }
    });
  }
}
