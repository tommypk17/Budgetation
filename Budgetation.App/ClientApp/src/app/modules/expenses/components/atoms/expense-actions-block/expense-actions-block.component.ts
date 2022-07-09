import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecurringExpenseSelectorDialogComponent} from "../recurring-expense-selector-dialog/recurring-expense-selector-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AbstractExpense} from "../../../../../models/financial";

@Component({
  selector: 'app-expense-actions-block',
  templateUrl: './expense-actions-block.component.html',
  styleUrls: ['./expense-actions-block.component.scss']
})
export class ExpenseActionsBlockComponent implements OnInit {

  @Output('newExpense') newExpense: EventEmitter<void> = new EventEmitter<void>();
  @Output('filter') filter: EventEmitter<string> = new EventEmitter<string>();
  @Output('sort') sort: EventEmitter<string> = new EventEmitter<string>();
  @Output('prepareRecurring') prepareRecurring: EventEmitter<AbstractExpense[]> = new EventEmitter<AbstractExpense[]>();

  @Input('expenses') expenses: AbstractExpense[] = [];
  @Input('disableNewExpense') disableNewExpense: boolean = true;
  @Input('disablePrepareRecurring') disablePrepareRecurring: boolean = true;
  @Input('filtered') filtered: boolean = false;


  constructor(private recurringDialog: MatDialog) { }

  ngOnInit(): void {
  }

  createNewExpense(): void {
    this.newExpense.next();
  }

  filterExpenses(event: string): void {
    this.filter.next(event);
  }

  sortExpenses(event: string): void {
    this.sort.next(event);
  }

  recurringBillsSelected(): void {
    let bills: AbstractExpense[] = [];
    const dialogRef = this.recurringDialog.open(RecurringExpenseSelectorDialogComponent, {
      data: bills
    });

    dialogRef.afterClosed().subscribe(result => {
      this.prepareRecurring.next(result);
    });
  }
}
