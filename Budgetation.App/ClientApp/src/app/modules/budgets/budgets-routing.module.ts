import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BudgetsComponent} from "./components/budgets/budgets.component";
import {WhatIfComponent} from "./components/what-if/what-if.component";

const routes: Routes = [
  {path: '', component: BudgetsComponent},
  {path: 'what-if', component: WhatIfComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule { }
