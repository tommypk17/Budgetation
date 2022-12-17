import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-budget-actions-block',
  templateUrl: './budget-actions-block.component.html',
  styleUrls: ['./budget-actions-block.component.scss']
})
export class BudgetActionsBlockComponent implements OnInit {
  @Output('newBudget') newBudget: EventEmitter<void> = new EventEmitter<void>();

  @Input('disableNewBudget') disableNewBudget: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  createNewBudget(): void {
    this.newBudget.next();
  }
}
