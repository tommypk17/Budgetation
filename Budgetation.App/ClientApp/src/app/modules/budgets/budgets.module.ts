import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './components/budgets/budgets.component';
import {FormsModule} from "@angular/forms";
import {ExpensesRoutingModule} from "../expenses/expenses-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import { WhatIfComponent } from './components/what-if/what-if.component';
import { BudgetBasicInformationComponent } from './atoms/budget-basic-information/budget-basic-information.component';
import { BudgetDetailsComponent } from './components/budget-details/budget-details.component';
import {ExistingBudgetBlockComponent} from "./atoms/existing-budget-block/existing-budget-block.component";


@NgModule({
  declarations: [
    BudgetsComponent,
    WhatIfComponent,
    BudgetBasicInformationComponent,
    BudgetDetailsComponent,
    ExistingBudgetBlockComponent
  ],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    FormsModule,

    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class BudgetsModule { }
