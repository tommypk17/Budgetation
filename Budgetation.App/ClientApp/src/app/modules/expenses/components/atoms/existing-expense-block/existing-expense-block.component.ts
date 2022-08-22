import {Component, ElementRef, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {
  AbstractExpense,
  RecurringExpense,
  SingleExpense
} from "../../../../../models/financial";
import {Subject} from "rxjs";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {PaidExpenseDialogComponent} from "../paid-expense-dialog/paid-expense-dialog.component";

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

  @ViewChild('paidDialog') paidDialog: TemplateRef<any>;

  constructor(private sharedService: SharedService, public dialog: MatDialog) { }

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

  displayMoney(amount: number): number{
    return this.sharedService.moneyRound(amount);
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

  markPaid(expense: AbstractExpense, paidOn: string): void {
    if(expense.amount <= 0){
      let dialog = this.dialog.open(PaidExpenseDialogComponent, {disableClose: true, data: expense.amount });
      dialog.afterClosed().subscribe((res: number) => {
        if(res > 0){
          expense.amount = res;
          if(AbstractExpense.getInstance(expense) == 'RecurringExpense'){
            expense = Object.assign(new RecurringExpense(), expense);
          }else{
            expense = Object.assign(new SingleExpense(), expense);
          }
          expense.paidOn = this.getPaidDate(this.expense, paidOn);
          this.paid.next(expense)
        }
      });
    }else{
      if(AbstractExpense.getInstance(expense) == 'RecurringExpense'){
        expense = Object.assign(new RecurringExpense(), expense);
      }else{
        expense = Object.assign(new SingleExpense(), expense);
      }
      expense.paidOn = this.getPaidDate(this.expense, paidOn);
      this.paid.next(expense)
    }
  }

  getPaidDate(expense: AbstractExpense, paidOn: string): Date{
    switch(paidOn){
      case 'today':
        return new Date();
      case 'onDue':
        return expense.due;
    }
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
