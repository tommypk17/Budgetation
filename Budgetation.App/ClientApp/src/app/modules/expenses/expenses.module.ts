import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { ExpensesRoutingModule } from "./expenses-routing.module";
import { ExpensesComponent } from './components/expenses/expenses.component';
import { NewExpenseBlockComponent } from './components/atoms/new-expense-block/new-expense-block.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { ExistingExpenseBlockComponent } from './components/atoms/existing-expense-block/existing-expense-block.component';
import { ExpenseActionsBlockComponent } from './components/atoms/expense-actions-block/expense-actions-block.component';
import { EditExpenseBlockComponent } from './components/atoms/edit-expense-block/edit-expense-block.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { StatsExpenseBlockComponent } from './components/atoms/stats-expense-block/stats-expense-block.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import { RecurringExpenseSelectorDialogComponent } from './components/atoms/recurring-expense-selector-dialog/recurring-expense-selector-dialog.component';
import {MatListModule} from "@angular/material/list";
import { PaidExpenseDialogComponent } from './components/atoms/paid-expense-dialog/paid-expense-dialog.component';

@NgModule({
  declarations: [ExpensesComponent, NewExpenseBlockComponent, ExistingExpenseBlockComponent, ExpenseActionsBlockComponent, EditExpenseBlockComponent, StatsExpenseBlockComponent, RecurringExpenseSelectorDialogComponent, PaidExpenseDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    ExpensesRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule
  ],
  providers: [MatDatepickerModule]
})
export class ExpensesModule { }
