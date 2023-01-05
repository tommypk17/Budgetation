import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BudgetExpense, eBudgetExpenseType} from "../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-new-budget-expense-block',
  templateUrl: './new-budget-expense-block.component.html',
  styleUrls: ['./new-budget-expense-block.component.scss']
})
export class NewBudgetExpenseBlockComponent implements OnInit {
  @Output('save') save: EventEmitter<BudgetExpense> = new EventEmitter<BudgetExpense>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input('budgetExpense') budgetExpense: BudgetExpense | undefined;

  budgetExpenseTypes: KeyValue<number, string>[] = [];
  constructor(private sharedService: SharedService) {
    this.budgetExpenseTypes = this.sharedService.budgetExpenseTypes;
  }

  ngOnInit(): void {
  }

  saveBudgetExpense(): void {
    this.save.next(this.budgetExpense)
  }

  cancelBudgetExpense(): void {
    this.cancel.next();
  }

}
