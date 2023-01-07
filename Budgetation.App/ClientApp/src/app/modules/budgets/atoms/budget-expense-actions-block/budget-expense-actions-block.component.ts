import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-budget-expense-actions-block',
  templateUrl: './budget-expense-actions-block.component.html',
  styleUrls: ['./budget-expense-actions-block.component.scss']
})
export class BudgetExpenseActionsBlockComponent implements OnInit {

  @Output('newBudgetExpense') newBudgetExpense: EventEmitter<void> = new EventEmitter<void>();
  @Output('filter') filter: EventEmitter<string> = new EventEmitter<string>();

  @Input('filtered') filtered: boolean = false;

  budgetExpenseTypes: KeyValue<number, string>[] = [];

  constructor(private sharedService: SharedService) {
    this.budgetExpenseTypes = this.sharedService.budgetExpenseTypes;
  }

  ngOnInit(): void {
  }

  createNewBudgetExpense(): void {
    this.newBudgetExpense.next();
  }

  filterBudgetExpenses(event: string): void {
    if(event == 'clear'){
      this.filtered = false;
    }else{
      this.filtered = true;
    }
    this.filter.next(event);
  }

}
