import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-income-actions-block',
  templateUrl: './income-actions-block.component.html',
  styleUrls: ['./income-actions-block.component.scss']
})
export class IncomeActionsBlockComponent implements OnInit {

  @Output('newIncome') newIncome: EventEmitter<void> = new EventEmitter<void>();
  @Output('filter') filter: EventEmitter<string> = new EventEmitter<string>();
  @Output('sort') sort: EventEmitter<string> = new EventEmitter<string>();
  @Input('disableNewIncome') disableNewIncome: boolean = true;

  filtered: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  createNewIncome(): void {
    this.newIncome.next();
  }

  filterIncome(event: string): void {
    this.filtered = event != 'clear';
    this.filter.next(event);
  }

  sortIncome(event: string): void {
    this.sort.next(event);
  }

}
