import {Component, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {AbstractExpense, RecurringExpense, SingleExpense} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";
import {PaidExpenseDialogComponent} from "../paid-expense-dialog/paid-expense-dialog.component";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditExpenseBlockComponent} from "../edit-expense-block/edit-expense-block.component";

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {

  @Input('expenses') expenses: AbstractExpense[];
  @Output('save') save: Subject<SingleExpense | RecurringExpense> = new Subject<SingleExpense | RecurringExpense>();
  @Output('paid') paid: Subject<SingleExpense | RecurringExpense> = new Subject<SingleExpense | RecurringExpense>();
  @Output('delete') delete: Subject<SingleExpense | RecurringExpense> = new Subject<SingleExpense | RecurringExpense>();

  expense: AbstractExpense;
  edit: boolean = false;

  displayedColumns: string[] = ['name', 'amount', 'type', 'paidOn', 'due', 'reoccurs', 'options']

  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  @ViewChild('paidDialog') paidDialog: TemplateRef<any>;

  constructor(private sharedService: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
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

  editExpense(expense: AbstractExpense): void{
    let dialog = this.dialog.open(EditExpenseBlockComponent);
    dialog.componentInstance.expense = expense;
    dialog.componentInstance.save.subscribe((expense) => {
      this.save.next(expense);
      dialog.close();
    })
    dialog.componentInstance.cancel.subscribe(() => {
      dialog.close();
    })
  }

  markPaid(expense: AbstractExpense, paidOn: string): void {
    if(expense.amount <= 0){
      let dialog = this.dialog.open(PaidExpenseDialogComponent, {disableClose: true, data: expense.amount });
      dialog.afterClosed().subscribe((res: number) => {
        if(res > -1 && res != undefined){
          expense.amount = res;
          if(AbstractExpense.getInstance(expense) == 'RecurringExpense'){
            expense = Object.assign(new RecurringExpense(), expense);
          }else{
            expense = Object.assign(new SingleExpense(), expense);
          }
          expense.paidOn = this.getPaidDate(expense, paidOn);
          this.paid.next(expense)
        }
      });
    }else{
      if(AbstractExpense.getInstance(expense) == 'RecurringExpense'){
        expense = Object.assign(new RecurringExpense(), expense);
      }else{
        expense = Object.assign(new SingleExpense(), expense);
      }
      expense.paidOn = this.getPaidDate(expense, paidOn);
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

  deleteExpense(expense: AbstractExpense): void {
    if(AbstractExpense.getInstance(expense) == 'RecurringExpense'){
      expense = Object.assign(new RecurringExpense(), expense);
    }else{
      expense = Object.assign(new SingleExpense(), expense);
    }
    this.delete.next(expense);
  }

}
