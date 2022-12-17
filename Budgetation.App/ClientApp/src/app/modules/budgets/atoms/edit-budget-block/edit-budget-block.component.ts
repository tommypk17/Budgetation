import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Budget} from "../../../../models/financial";

@Component({
  selector: 'app-edit-budget-block',
  templateUrl: './edit-budget-block.component.html',
  styleUrls: ['./edit-budget-block.component.scss']
})
export class EditBudgetBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<Budget> = new EventEmitter<Budget>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('budget') budget: Budget;

  constructor() { }

  ngOnInit(): void {
  }

  saveBudget(): void {
    this.save.emit(this.budget);
  }

  cancelEditBudget(): void {
    this.cancel.emit();
  }

}
