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
  currentBudgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getAllBudgets().subscribe((res: iResponse<Budget[]>) => {
      if(res && res.data) this.allBudgets = res.data; this.currentBudgets = res.data;
    });
  }

}
