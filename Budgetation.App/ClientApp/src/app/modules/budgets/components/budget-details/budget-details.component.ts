import { Component, OnInit } from '@angular/core';
import {Budget} from "../../../../models/financial";
import {BudgetService} from "../../../../services/budget.service";
import {iResponse} from "../../../../models/response";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {
  headerBlock = {blockTitle: "Budgets", blockSubtitle: "", blockContent: ""};

  budget: Budget;

  edit: boolean = false;

  constructor(private budgetService: BudgetService, private route: ActivatedRoute) { }

  get budgetId(): string {
    let budgetId = this.route.snapshot.params['budgetId']
    if(budgetId) return budgetId;
    else return "";
  }

  ngOnInit(): void {
    this.budgetService.getBudget(this.budgetId).subscribe((res: iResponse<Budget>) => {
      if(res && res.data){
        this.budget = res.data;
        this.headerBlock.blockTitle = `Budgets - ${this.budget.name}`;
      }
    });
  }

  saveBudget(budget: Budget): void {

  }

}
