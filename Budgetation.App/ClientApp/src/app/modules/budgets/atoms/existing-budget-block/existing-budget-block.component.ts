import {Component, Input, OnInit} from '@angular/core';
import {Budget} from "../../../../models/financial";

@Component({
  selector: 'app-existing-budget-block',
  templateUrl: './existing-budget-block.component.html',
  styleUrls: ['./existing-budget-block.component.scss']
})
export class ExistingBudgetBlockComponent implements OnInit {

  @Input('budget') budget: Budget;

  constructor() { }

  ngOnInit(): void {
  }

}
