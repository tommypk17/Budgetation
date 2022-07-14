import {Component, Input, OnInit, Output} from '@angular/core';
import {
  AbstractExpense,
  eExpenseType,
  eReoccurrence,
  RecurringExpense,
  SingleExpense
} from "../../../../../models/financial";
import {Subject} from "rxjs";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";

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
  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
  }

  displayDate(inDate: Date): string {
    let date: Date;
    if(inDate != null) {
      let date: Date = new Date(inDate);
      return date.toLocaleDateString();
    }else{
      return 'N/A';
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

  displayExpenseType(type: number): string {
    let typeString: string | undefined = this.expenseTypes.find(x => x.key == type)?.value;
    return typeString? typeString: 'N/A';
  }

  displayReoccurrenceType(type: number | undefined): string {
    if(type == undefined) return 'No';
    let typeString: string | undefined = this.reoccurrences.find(x => x.key == type)?.value;
    return typeString? typeString: 'No';
  }
}
