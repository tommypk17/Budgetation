import { Component, OnInit } from '@angular/core';
import {Budget, BudgetExpense, eBudgetExpenseType, eExpenseType} from "../../../../models/financial";
import {BudgetService} from "../../../../services/budget.service";
import {iResponse} from "../../../../models/response";
import {ActivatedRoute} from "@angular/router";
import {
  EditExpenseBlockComponent
} from "../../../expenses/components/atoms/edit-expense-block/edit-expense-block.component";
import {SharedService} from "../../../../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {NewBudgetExpenseBlockComponent} from "../../atoms/new-budget-expense-block/new-budget-expense-block.component";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {
  headerBlock = {blockTitle: "Budgets", blockSubtitle: "", blockContent: ""};

  budget: Budget;

  edit: boolean = false;

  currentFilter: string | undefined;

  allBudgetExpenses: BudgetExpense[] = [];
  currentBudgetExpenses: BudgetExpense[] = [];

  constructor(private budgetService: BudgetService, private route: ActivatedRoute, private sharedService: SharedService, public dialog: MatDialog) { }

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
        Object.keys(res.data.expenses).forEach((v) => {
          this.currentBudgetExpenses.push(res.data.expenses[v]);
          this.allBudgetExpenses.push(res.data.expenses[v]);
        })
      }
    });
  }

  saveBudget(budget: Budget): void {

  }

  newBudgetExpense(): void {
    let dialog = this.dialog.open(NewBudgetExpenseBlockComponent);
    dialog.componentInstance.budgetExpense = new BudgetExpense();
    dialog.componentInstance.save.subscribe((expense) => {
      this.budgetService.createBudgetExpense(this.budgetId, expense).subscribe((res: iResponse<BudgetExpense>) => {
        this.budgetService.getBudgetExpenses(this.budgetId).subscribe((res:iResponse<KeyValue<string, BudgetExpense>[]>) => {
          if(res && res.data) {
            this.currentBudgetExpenses = [];
            this.allBudgetExpenses = [];
            Object.keys(res.data).forEach((v) => {
              this.currentBudgetExpenses.push(res.data[v]);
              this.allBudgetExpenses.push(res.data[v]);
            });
            this.reFilterSort();
          }
        });
      });
      dialog.close();
    })
    dialog.componentInstance.cancel.subscribe(() => {
      dialog.close();
    })
  }

  filterBudgetExpenses(filterBy: string): void {
    this.currentFilter = filterBy;
    switch (filterBy){
      case 'clear':
        this.currentFilter = undefined;
        this.currentBudgetExpenses = this.allBudgetExpenses;
        break;
      case 'need':
        this.currentBudgetExpenses = this.allBudgetExpenses.filter(x => x.type == eBudgetExpenseType.Need);
        break;
      case 'want':
        this.currentBudgetExpenses = this.allBudgetExpenses.filter(x => x.type == eBudgetExpenseType.Want);
        break;
      case 'extra':
        this.currentBudgetExpenses = this.allBudgetExpenses.filter(x => x.type == eBudgetExpenseType.Extra);
        break;
    }
  }

  reFilterSort(): void {
    this.currentBudgetExpenses = this.allBudgetExpenses;
    if(this.currentFilter) this.filterBudgetExpenses(this.currentFilter);
  }

}
