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
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { StatsIncomeBlockComponent } from './components/atoms/stats-income-block/stats-income-block.component';
import { IncomeTableComponent } from './components/atoms/income-table/income-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    IncomeComponent,
    IncomeActionsBlockComponent,
    ExistingIncomeBlockComponent,
    NewIncomeBlockComponent,
    EditIncomeBlockComponent,
    StatsIncomeBlockComponent,
    IncomeTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    IncomeRoutingModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [MatDatepickerModule]
})
export class IncomeModule { }
