import {Component, Input, OnInit, Output} from '@angular/core';
import {AbstractExpense} from "../../../../../models/financial";
import {Subject} from "rxjs";
import {B} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-existing-expense-block',
  templateUrl: './existing-expense-block.component.html',
  styleUrls: ['./existing-expense-block.component.scss']
})
export class ExistingExpenseBlockComponent implements OnInit {

  @Input('expense') expense: AbstractExpense | undefined;
  @Output('save') save: Subject<AbstractExpense> = new Subject<AbstractExpense>();
  @Output('delete') delete: Subject<AbstractExpense> = new Subject<AbstractExpense>();
  @Output('paid') paid: Subject<AbstractExpense> = new Subject<AbstractExpense>();

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
    this.delete.next(expense);
  }

  markPaid(expense: AbstractExpense): void {
    this.paid.next(expense)
  }
}
