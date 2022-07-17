import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecurringExpenseSelectorDialogComponent} from "../recurring-expense-selector-dialog/recurring-expense-selector-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AbstractExpense, RecurringExpense} from "../../../../../models/financial";
import {SharedService} from "../../../../../services/shared.service";
import {KeyValue} from "@angular/common";
import {ExpenseService} from "../../../../../services/expense.service";
import {iResponse} from "../../../../../models/response";

@Component({
  selector: 'app-expense-actions-block',
  templateUrl: './expense-actions-block.component.html',
  styleUrls: ['./expense-actions-block.component.scss']
})
export class ExpenseActionsBlockComponent implements OnInit {

  @Output('newExpense') newExpense: EventEmitter<void> = new EventEmitter<void>();
  @Output('filter') filter: EventEmitter<string> = new EventEmitter<string>();
  @Output('sort') sort: EventEmitter<string> = new EventEmitter<string>();
  @Output('prepareRecurring') prepareRecurring: EventEmitter<RecurringExpense[]> = new EventEmitter<RecurringExpense[]>();

  @Input('expenses') expenses: AbstractExpense[] = [];
  @Input('disableNewExpense') disableNewExpense: boolean = true;
  @Input('disablePrepareRecurring') disablePrepareRecurring: boolean = true;
  @Input('filtered') filtered: boolean = false;

  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  constructor(private recurringDialog: MatDialog, private sharedService: SharedService, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
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
    this.expenseService.prepareReoccurrences().subscribe((res: iResponse<RecurringExpense[]>) => {
      if(res && res.data){
        this.disablePrepareRecurring = true;
        const dialogRef = this.recurringDialog.open(RecurringExpenseSelectorDialogComponent, {
          data: res.data
        });

        dialogRef.afterClosed().subscribe(result => {
          this.disablePrepareRecurring = false;
          this.prepareRecurring.next(result);
        });
      }
    })
  }
}
