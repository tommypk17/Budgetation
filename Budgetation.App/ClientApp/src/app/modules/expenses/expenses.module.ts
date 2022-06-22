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

@NgModule({
  declarations: [ExpensesComponent, NewExpenseBlockComponent, ExistingExpenseBlockComponent, ExpenseActionsBlockComponent, EditExpenseBlockComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    ExpensesRoutingModule,
    SharedModule,
    MatChipsModule,
  ]
})
export class ExpensesModule { }
