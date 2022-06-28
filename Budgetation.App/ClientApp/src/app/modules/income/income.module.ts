import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './components/income/income.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExpensesRoutingModule} from "../expenses/expenses-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MatChipsModule} from "@angular/material/chips";
import { IncomeActionsBlockComponent } from './components/atoms/income-actions-block/income-actions-block.component';
import {MatMenuModule} from "@angular/material/menu";
import { ExistingIncomeBlockComponent } from './components/atoms/existing-income-block/existing-income-block.component';
import { NewIncomeBlockComponent } from './components/atoms/new-income-block/new-income-block.component';
import { EditIncomeBlockComponent } from './components/atoms/edit-income-block/edit-income-block.component';


@NgModule({
  declarations: [
    IncomeComponent,
    IncomeActionsBlockComponent,
    ExistingIncomeBlockComponent,
    NewIncomeBlockComponent,
    EditIncomeBlockComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    IncomeRoutingModule,
    SharedModule,
    MatMenuModule,
  ]
})
export class IncomeModule { }
