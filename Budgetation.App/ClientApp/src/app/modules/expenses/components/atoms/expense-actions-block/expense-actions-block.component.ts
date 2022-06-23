import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-expense-actions-block',
  templateUrl: './expense-actions-block.component.html',
  styleUrls: ['./expense-actions-block.component.scss']
})
export class ExpenseActionsBlockComponent implements OnInit {

  @Output('newBill') newBill: EventEmitter<void> = new EventEmitter<void>();
  @Output('filter') filter: EventEmitter<string> = new EventEmitter<string>();
  @Output('sort') sort: EventEmitter<string> = new EventEmitter<string>();
  @Input('disableNewBill') disableNewBill: boolean = true;

  filtered: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  createNewBill(): void {
    this.newBill.next();
  }

  filterBills(event: string): void {
    this.filtered = event != 'clear';
    this.filter.next(event);
  }

  sortBills(event: string): void {
    this.sort.next(event);
  }

}
