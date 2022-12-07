import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../../../services/budget.service";
import {Budget} from "../../../../models/financial";
import {iResponse} from "../../../../models/response";

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  headerBlock = {blockTitle: "Budgets", blockSubtitle: "", blockContent: ""};

  allBudgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
  }

}
