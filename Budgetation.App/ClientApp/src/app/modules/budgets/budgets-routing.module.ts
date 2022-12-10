import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BudgetsComponent} from "./components/budgets/budgets.component";
import {WhatIfComponent} from "./components/what-if/what-if.component";
import {BudgetDetailsComponent} from "./components/budget-details/budget-details.component";
import {PreviousPageGuard} from "../../guards/previous-page.guard";

const routes: Routes = [
  {path: '', component: BudgetsComponent, canDeactivate: [PreviousPageGuard]},
  {path: 'what-if', component: WhatIfComponent, canDeactivate: [PreviousPageGuard]},
  {path: ':budgetId', component: BudgetDetailsComponent, canDeactivate: [PreviousPageGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule { }
