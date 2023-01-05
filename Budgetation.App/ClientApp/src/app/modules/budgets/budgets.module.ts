import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './components/budgets/budgets.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { MatOptionModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import { BudgetDetailsComponent } from './components/budget-details/budget-details.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ExistingBudgetBlockComponent } from './atoms/existing-budget-block/existing-budget-block.component';
import { BudgetActionsBlockComponent } from './atoms/budget-actions-block/budget-actions-block.component';
import { EditBudgetBlockComponent } from './atoms/edit-budget-block/edit-budget-block.component';
import { NewBudgetBlockComponent } from './atoms/new-budget-block/new-budget-block.component';
import { BudgetExpenseActionsBlockComponent } from './atoms/budget-expense-actions-block/budget-expense-actions-block.component';
import { NewBudgetExpenseBlockComponent } from './atoms/new-budget-expense-block/new-budget-expense-block.component';
import { BudgetExpenseTableComponent } from './atoms/budget-expense-table/budget-expense-table.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    BudgetsComponent,
    BudgetDetailsComponent,
    ExistingBudgetBlockComponent,
    BudgetActionsBlockComponent,
    EditBudgetBlockComponent,
    NewBudgetBlockComponent,
    BudgetExpenseActionsBlockComponent,
    NewBudgetExpenseBlockComponent,
    BudgetExpenseTableComponent
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
    MatListModule,
    MatSlideToggleModule,
    MatTableModule

  ]
})
export class BudgetsModule { }
