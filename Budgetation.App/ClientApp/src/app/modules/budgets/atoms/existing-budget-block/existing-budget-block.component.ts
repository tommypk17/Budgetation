import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Budget} from "../../../../models/financial";

@Component({
  selector: 'app-existing-budget-block',
  templateUrl: './existing-budget-block.component.html',
  styleUrls: ['./existing-budget-block.component.scss']
})
export class ExistingBudgetBlockComponent implements OnInit {

  @Input('budget') budget: Budget;
  @Output('save') save: EventEmitter<Budget> = new EventEmitter<Budget>();

  edit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  saveBudget(budget: Budget): void {
    this.save.next(budget);
  }

}
