import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Budget} from "../../../../models/financial";

@Component({
  selector: 'app-new-budget-block',
  templateUrl: './new-budget-block.component.html',
  styleUrls: ['./new-budget-block.component.scss']
})
export class NewBudgetBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<Budget> = new EventEmitter<Budget>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('budget') budget: Budget;

  constructor() { }

  ngOnInit(): void {
  }

  saveBudget(): void {
    this.save.emit(this.budget);
  }

  cancelNewBudget(): void {
    this.cancel.emit();
  }

}
