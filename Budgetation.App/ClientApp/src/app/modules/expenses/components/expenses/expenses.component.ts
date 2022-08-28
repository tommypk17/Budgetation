import {Component, OnInit, ViewChild} from '@angular/core';
import {
  SingleExpense,
  RecurringExpense,
  eExpenseType,
  AbstractExpense,
  eReoccurrence, eExpensesFor
} from "../../../../models/financial";
import {ExpenseService} from "../../../../services/expense.service";
import {iResponse} from "../../../../models/response";
import {StatsExpenseBlockComponent} from "../atoms/stats-expense-block/stats-expense-block.component";
import {SharedService} from "../../../../services/shared.service";
import {UserPreferencesService} from "../../../../services/user-preferences.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  headerBlock = {blockTitle: "Expenses", blockSubtitle: "", blockContent: ""};

  newExpense: AbstractExpense | undefined;

  allExpenses: AbstractExpense[] = [];
  currentExpenses: AbstractExpense[] = [];

  currentSort: string | undefined;
  currentFilter: string | undefined;

  currentExpensesFor: string = eExpensesFor.Current;
  currentMonth: Date;

  @ViewChild('expenseStats') expenseStats: StatsExpenseBlockComponent;

  constructor(private expenseService: ExpenseService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses(): void {
    this.expenseService.getAllExpenses().subscribe((res:iResponse<AbstractExpense[]>) => {
      if(res && res.data){
        this.allExpenses = res.data;
        this.currentExpenses = this.allExpenses;
        this.sortExpenses('byDateDueSoonToFar');
        this.showExpenses(this.currentExpensesFor);
      }
    });
  }

  saveNewExpense(expense: SingleExpense | RecurringExpense): void {
    if(expense instanceof SingleExpense){
      this.expenseService.saveSingleExpense(expense as SingleExpense).subscribe((res: iResponse<SingleExpense>) => {
        if(res && res.data){
          this.allExpenses.push(res.data);
          this.newExpense = undefined;
          this.reFilterSort();
        }
      });
    }else if (expense instanceof RecurringExpense){
      this.expenseService.saveRecurrringExpense(expense as RecurringExpense).subscribe((res: iResponse<RecurringExpense>) => {
        if(res && res.data){
          this.allExpenses.push(res.data);
          this.newExpense = undefined;
          this.reFilterSort();
        }
      });
    }
  }

  saveExistingExpense(expense: SingleExpense | RecurringExpense): void {
    if(expense instanceof SingleExpense){
      this.expenseService.updateSingleExpense(expense as SingleExpense).subscribe((res: iResponse<SingleExpense>) => {
        if(res && res.data){
          let existingExpenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          if(existingExpenseIdx > -1){
            this.allExpenses[existingExpenseIdx] = res.data;
          }
          this.reFilterSort();
        }
      });
    }else if (expense instanceof RecurringExpense){
      this.expenseService.updateRecurrringExpense(expense as RecurringExpense).subscribe((res: iResponse<RecurringExpense>) => {
        if(res && res.data){
          let existingExpenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          if(existingExpenseIdx > -1){
            this.allExpenses[existingExpenseIdx] = res.data;
          }
          this.reFilterSort();
        }
      });
    }


  }

  deleteExpense(expense: SingleExpense | RecurringExpense): void {
    if(expense instanceof SingleExpense){
      this.expenseService.deleteSingleExpense(expense as SingleExpense).subscribe((res: iResponse<SingleExpense>) => {
        if(res && res.data){
          let expenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          this.allExpenses.splice(expenseIdx, 1);
          this.currentExpenses = this.allExpenses;
          this.reFilterSort();
        }
      });

    }else if (expense instanceof RecurringExpense ){
      this.expenseService.deleteRecurrringExpense(expense as RecurringExpense).subscribe((res: iResponse<RecurringExpense>) => {
        if(res && res.data){
          let expenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          this.allExpenses.splice(expenseIdx, 1);
          this.currentExpenses = this.allExpenses;
          this.reFilterSort();
        }
      });
    }
  }

  markExpensePaid(expense: SingleExpense | RecurringExpense): void {
    if(!expense.paidOn) expense.paidOn = new Date(Date.now());
    if(expense instanceof SingleExpense){
      this.expenseService.updateSingleExpense(expense as SingleExpense).subscribe((res: iResponse<SingleExpense>) => {
        if(res && res.data){
          let existingExpenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          if(existingExpenseIdx > -1){
            this.allExpenses[existingExpenseIdx] = res.data;
          }
          this.reFilterSort();
        }
      });
    }else if (expense instanceof RecurringExpense){
      this.expenseService.updateRecurrringExpense(expense as RecurringExpense).subscribe((res: iResponse<RecurringExpense>) => {
        if(res && res.data){
          let existingExpenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          if(existingExpenseIdx > -1){
            this.allExpenses[existingExpenseIdx] = res.data;
          }
          this.reFilterSort();
        }
      });
    }
  }

  prepareRecurring(expense: RecurringExpense[]): void {
    if(expense && expense.length > 0){
      this.expenseService.addReoccurrences(expense).subscribe((res: iResponse<RecurringExpense[]>) => {
        if(res && res.data){
          this.allExpenses = this.allExpenses.concat(res.data);
          this.newExpense = undefined;
          this.reFilterSort();
        }
      });
    }
  }

  reFilterSort(): void {
    this.currentExpenses = this.allExpenses;
    if(this.currentSort) this.sortExpenses(this.currentSort);
    if(this.currentFilter) this.filterExpenses(this.currentFilter);
    this.showExpenses(this.currentExpensesFor);
    this.expenseStats.refreshTotal();
  }

  createNewExpense(): void {
    this.newExpense = new SingleExpense();
  }

  cancelNewExpense(): void {
    this.newExpense = undefined;
  }

  showExpenses(expensesFor: string){
    this.currentExpensesFor = expensesFor;
    switch (expensesFor){
      case eExpensesFor.All:
        this.currentExpenses = this.allExpenses;
        break;
      case eExpensesFor.Current:
        this.currentExpenses = this.currentExpenses.filter(x => new Date(x.due) >= this.sharedService.firstDayOfMonthCurrent);
        this.currentExpenses = this.currentExpenses.filter(x => new Date(x.due) <= this.sharedService.lastDayOfMonthCurrent);
        break;
      case eExpensesFor.Month:
        this.filterByMonth(this.currentMonth)
        break;
    }
  }

  showMonth(date: Date){
      this.reFilterSort();
      this.currentMonth = date;
      this.filterByMonth(date);
      this.currentExpensesFor = eExpensesFor.Month;
  }

  filterByMonth(date: Date | undefined){
    if(date){
      this.currentExpenses = this.currentExpenses.filter(x => new Date(x.due) >= date);
      this.currentExpenses = this.currentExpenses.filter(x => new Date(x.due) <= new Date(date.getFullYear(), date.getMonth() + 1, 0));
    }
  }

  filterExpenses(filterBy: string): void {
    this.currentFilter = filterBy;
    switch (filterBy){
      case 'clear':
        this.currentExpenses = this.allExpenses;
        this.currentFilter = undefined;
        break;
      case 'need':
        this.currentExpenses = this.allExpenses.filter(x => x.type == eExpenseType.Need);
        break;
      case 'want':
        this.currentExpenses = this.allExpenses.filter(x => x.type == eExpenseType.Want);
        break;
      case 'extra':
        this.currentExpenses = this.allExpenses.filter(x => x.type == eExpenseType.Extra);
        break;
      case 'single':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == undefined);
        break;
      case 'weekly':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == eReoccurrence.Weekly);
        break;
      case 'biweekly':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == eReoccurrence.Biweekly);
        break;
      case 'monthly':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == eReoccurrence.Monthly);
        break;
      case 'quarterly':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == eReoccurrence.Quarterly);
        break;
      case 'biquarterly':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == eReoccurrence.Biquarterly);
        break;
      case 'yearly':
        this.currentExpenses = this.allExpenses.filter(x => x.interval == eReoccurrence.Yearly);
        break;
    }
    this.showExpenses(this.currentExpensesFor);
    this.filterByMonth(this.currentMonth);
  }

  sortExpenses(sortOrder: string): void {
    this.currentSort = sortOrder;
    this.currentExpenses = this.allExpenses;
    let keyVal = [];
    let i = 0;
    Object.keys(eExpenseType).forEach((v) => {
      keyVal[eExpenseType[v]] = i;
      i++;
    });
    switch (sortOrder){
      case 'clear':
        this.currentExpenses = this.allExpenses;
        break;
      case 'byTypeNeedToExtra':
        this.currentExpenses.sort( (a,b ) => {
          return keyVal[a.type] - keyVal[b.type];
        });
        break;
      case 'byTypeExtraToNeed':
        this.currentExpenses.sort( (a,b ) => {
          return keyVal[b.type] - keyVal[a.type];
        });
        break;
      case 'byCostLowToHigh':
        this.currentExpenses.sort((a,b) => {
          return a.amount - b.amount;
        });
        break;
      case 'byCostHighToLow':
        this.currentExpenses.sort((a,b) => {
          return b.amount - a.amount;
        });
        break;
      case 'byDateDueSoonToFar':
        this.currentExpenses.sort((a,b) => {
          let aDate, bDate: Date;
          if(!b.due) bDate = new Date(0);
          else bDate = new Date(b.due)
          if(!a.due) aDate = new Date(0);
          else aDate = new Date(a.due)
          return aDate.valueOf() - bDate.valueOf()
        });
        break;
      case 'byDateDueFarToSoon':
        this.currentExpenses.sort((a,b) => {
          let aDate, bDate: Date;
          if(!b.due) bDate = new Date(0);
          else bDate = new Date(b.due)
          if(!a.due) aDate = new Date(0);
          else aDate = new Date(a.due)
          return bDate.valueOf() - aDate.valueOf()
        });
        break;
    }
  }

}
