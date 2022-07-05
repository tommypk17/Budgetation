import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {eReoccurrence, iBill} from "../../../../../models/financial";
import {RecurringExpenseSelectorDialogComponent} from "../recurring-expense-selector-dialog/recurring-expense-selector-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-expense-actions-block',
  templateUrl: './expense-actions-block.component.html',
  styleUrls: ['./expense-actions-block.component.scss']
})
export class ExpenseActionsBlockComponent implements OnInit {

  @Output('newBill') newBill: EventEmitter<void> = new EventEmitter<void>();
  @Output('filter') filter: EventEmitter<string> = new EventEmitter<string>();
  @Output('sort') sort: EventEmitter<string> = new EventEmitter<string>();
  @Output('prepareRecurring') prepareRecurring: EventEmitter<iBill[]> = new EventEmitter<iBill[]>();

  @Input('bills') bills: iBill[] = [];
  @Input('disableNewBill') disableNewBill: boolean = true;
  @Input('disablePrepareRecurring') disablePrepareRecurring: boolean = true;
  @Input('filtered') filtered: boolean = false;


  constructor(private recurringDialog: MatDialog) { }

  ngOnInit(): void {
  }

  createNewBill(): void {
    this.newBill.next();
  }

  filterBills(event: string): void {
    this.filter.next(event);
  }

  sortBills(event: string): void {
    this.sort.next(event);
  }

  recurringBillsSelected(): void {
    let bills: iBill[] = [];
    const dialogRef = this.recurringDialog.open(RecurringExpenseSelectorDialogComponent, {
      data: bills
    });

    dialogRef.afterClosed().subscribe(result => {
      this.prepareRecurring.next(result);
    });
  }
}
