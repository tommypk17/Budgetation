import {Component, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {AbstractExpense, Income, RecurringExpense, SingleExpense} from "../../../../../models/financial";
import {Subject} from "rxjs";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {
  EditExpenseBlockComponent
} from "../../../../expenses/components/atoms/edit-expense-block/edit-expense-block.component";
import {
  PaidExpenseDialogComponent
} from "../../../../expenses/components/atoms/paid-expense-dialog/paid-expense-dialog.component";
import {EditIncomeBlockComponent} from "../edit-income-block/edit-income-block.component";

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.scss']
})
export class IncomeTableComponent implements OnInit {
  @Input('incomes') incomes: Income[];
  @Output('save') save: Subject<Income> = new Subject<Income>();
  @Output('delete') delete: Subject<Income> = new Subject<Income>();

  displayedColumns: string[] = ['incomingBalance', 'amount', 'type', 'date', 'options']

  incomeTypes: KeyValue<number, string>[] = [];

  constructor(private sharedService: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.incomeTypes = this.sharedService.incomeTypes;
  }

  displayIncomeType(type: number): string {
    let typeString: string | undefined = this.incomeTypes.find(x => x.key == type)?.value;
    return typeString? typeString: 'N/A';
  }

  editIncome(income: Income): void{
    let dialog = this.dialog.open(EditIncomeBlockComponent);
    dialog.componentInstance.income = income;
    dialog.componentInstance.save.subscribe((income) => {
      this.save.next(income);
      dialog.close();
    })
    dialog.componentInstance.cancel.subscribe(() => {
      dialog.close();
    })
  }

  deleteIncome(income: Income): void {
    this.delete.next(income);
  }

}
