import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../../../services/budget.service";
import {Budget, SingleExpense} from "../../../../models/financial";
import {iResponse} from "../../../../models/response";

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  headerBlock = {blockTitle: "Budgets", blockSubtitle: "", blockContent: ""};

  newBudget: Budget | undefined;


  allBudgets: Budget[] = [];
  currentBudgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.getAllBudgets();
  }

  getAllBudgets(): void {
    this.budgetService.getAllBudgets().subscribe((res: iResponse<Budget[]>) => {
      if(res && res.data) this.allBudgets = res.data; this.currentBudgets = res.data;
    });
  }

  createNewBudget(): void{
    this.newBudget = new Budget();
  }

  saveExistingBudget(budget: Budget): void {

  }

  saveNewBudget(budget: Budget): void {
    this.budgetService.createBudget(budget).subscribe((res: iResponse<Budget>) => {
      this.getAllBudgets();
      this.newBudget = undefined;
    });
  }

  cancelNewBudget(): void {
    this.newBudget = undefined;
  }

}
