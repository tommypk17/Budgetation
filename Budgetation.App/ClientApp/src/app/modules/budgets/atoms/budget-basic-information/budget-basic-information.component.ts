import {Component, Input, OnInit} from '@angular/core';
import {Budget} from "../../../../models/financial";

@Component({
  selector: 'app-budget-basic-information',
  templateUrl: './budget-basic-information.component.html',
  styleUrls: ['./budget-basic-information.component.scss']
})
export class BudgetBasicInformationComponent implements OnInit {

  @Input('budget') budget: Budget;

  constructor() { }

  ngOnInit(): void {
  }

  saveBudget(): void {

  }

}
