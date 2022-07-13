import {Component, Input, OnInit, Output} from '@angular/core';
import {AbstractExpense, RecurringExpense, SingleExpense} from "../../../../../models/financial";
import {Subject} from "rxjs";
import {B} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-existing-expense-block',
  templateUrl: './existing-expense-block.component.html',
  styleUrls: ['./existing-expense-block.component.scss']
})
export class ExistingExpenseBlockComponent implements OnInit {

  @Input('expense') expense: AbstractExpense | undefined;
  @Output('save') save: Subject<SingleExpense | RecurringExpense> = new Subject<SingleExpense | RecurringExpense>();
  @Output('delete') delete: Subject<SingleExpense | RecurringExpense> = new Subject<SingleExpense | RecurringExpense>();
  @Output('paid') paid: Subject<SingleExpense | RecurringExpense> = new Subject<SingleExpense | RecurringExpense>();

  edit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  displayDate(inDate: Date): string {
    let date: Date;
    if(inDate != null) {
      let date: Date = new Date(inDate);
      return date.toLocaleDateString();
    }
  }

  saveExpense(expense: AbstractExpense): void {
    this.save.next(expense);
  }

  deleteExpense(expense: AbstractExpense): void {
    if(AbstractExpense.getInstance(expense) == 'RecurringExpense'){
      expense = Object.assign(new RecurringExpense(), expense);
    }else{
      expense = Object.assign(new SingleExpense(), expense);
    }
    this.delete.next(expense);
  }

  markPaid(expense: AbstractExpense): void {
    this.paid.next(expense)
  }
}
