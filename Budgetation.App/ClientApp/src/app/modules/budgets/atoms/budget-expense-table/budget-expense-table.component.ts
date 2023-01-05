import {Component, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {AbstractExpense, BudgetExpense, RecurringExpense, SingleExpense} from "../../../../models/financial";
import {Subject} from "rxjs";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {
  EditExpenseBlockComponent
} from "../../../expenses/components/atoms/edit-expense-block/edit-expense-block.component";
import {
  PaidExpenseDialogComponent
} from "../../../expenses/components/atoms/paid-expense-dialog/paid-expense-dialog.component";

@Component({
  selector: 'app-budget-expense-table',
  templateUrl: './budget-expense-table.component.html',
  styleUrls: ['./budget-expense-table.component.scss']
})
export class BudgetExpenseTableComponent implements OnInit {


  @Input('budgetExpenses') budgetExpenses: BudgetExpense[];
  @Output('save') save: Subject<BudgetExpense> = new Subject<BudgetExpense>();
  @Output('paid') paid: Subject<BudgetExpense> = new Subject<BudgetExpense>();
  @Output('delete') delete: Subject<BudgetExpense> = new Subject<BudgetExpense>();

  budgetExpense: BudgetExpense;
  edit: boolean = false;

  displayedColumns: string[] = ['name', 'amount', 'type', 'options']

  budgetExpenseTypes: KeyValue<number, string>[] = [];

  @ViewChild('paidDialog') paidDialog: TemplateRef<any>;

  constructor(private sharedService: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.budgetExpenseTypes = this.sharedService.budgetExpenseTypes;
  }

  displayBudgetExpenseType(type: number): string {
    let typeString: string | undefined = this.budgetExpenseTypes.find(x => x.key == type)?.value;
    return typeString? typeString: 'N/A';
  }

  editBudgetExpense(expense: AbstractExpense): void{
/*    let dialog = this.dialog.open(EditExpenseBlockComponent);
    dialog.componentInstance.expense = expense;
    dialog.componentInstance.save.subscribe((expense) => {
      this.save.next(expense);
      dialog.close();
    })
    dialog.componentInstance.cancel.subscribe(() => {
      dialog.close();
    })*/
  }

  deleteBudgetExpense(expense: BudgetExpense): void {
    this.delete.next(expense);
  }


}
