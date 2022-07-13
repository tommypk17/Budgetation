import {Component, OnInit} from '@angular/core';
import {SingleExpense, RecurringExpense, eExpenseType, AbstractExpense} from "../../../../models/financial";
import {ExpenseService} from "../../../../services/expense.service";
import {iResponse} from "../../../../models/response";

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

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses(): void {
    this.expenseService.getAllExpenses().subscribe((res:iResponse<AbstractExpense[]>) => {
      if(res && res.data){
        this.allExpenses = res.data;
        this.currentExpenses = this.allExpenses;
        this.sortExpenses('byDateDueSoonToFar');
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
        }
      });

    }else if (expense instanceof RecurringExpense ){
      this.expenseService.deleteRecurrringExpense(expense as RecurringExpense).subscribe((res: iResponse<RecurringExpense>) => {
        if(res && res.data){
          let expenseIdx = this.allExpenses.findIndex(x => x.id == expense.id);
          this.allExpenses.splice(expenseIdx, 1);
          this.currentExpenses = this.allExpenses;
        }
      });
    }
  }

  markExpensePaid(expense: SingleExpense | RecurringExpense): void {
    if(!expense.paidOn) expense.paidOn = new Date(Date.now());
    else expense.paidOn = undefined;
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

  prepareRecurring(bills: AbstractExpense[]): void {
    // if(bills && bills.length > 0){
    //   this.billService.addReoccurrences(bills).subscribe((res: iResponse<iBill[]>) => {
    //     if(res && res.data){
    //       this.allBills = this.allBills.concat(res.data);
    //       this.newBill = undefined;
    //       this.reFilterSort();
    //     }
    //   });
    // }
  }

  reFilterSort(): void {
    this.currentExpenses = this.allExpenses;
    if(this.currentSort) this.sortExpenses(this.currentSort);
    if(this.currentFilter) this.filterExpenses(this.currentFilter);
  }

  createNewExpense(): void {
    this.newExpense = new SingleExpense();
  }

  cancelNewExpense(): void {
    this.newExpense = undefined;
  }

  filterExpenses(filterBy: string): void {
    this.currentFilter = filterBy;
    switch (filterBy){
      case 'clear':
        this.currentExpenses = this.allExpenses;
        this.currentFilter = undefined;
        break;
      case 'need':
        this.currentExpenses = this.allExpenses.filter(x => x.expense.type == eExpenseType.Need);
        break;
      case 'want':
        this.currentExpenses = this.allExpenses.filter(x => x.expense.type == eExpenseType.Want);
        break;
      case 'extra':
        this.currentExpenses = this.allExpenses.filter(x => x.expense.type == eExpenseType.Extra);
        break;
    }
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
          return keyVal[a.expense.type] - keyVal[b.expense.type];
        });
        break;
      case 'byTypeExtraToNeed':
        this.currentExpenses.sort( (a,b ) => {
          return keyVal[b.expense.type] - keyVal[a.expense.type];
        });
        break;
      case 'byCostLowToHigh':
        this.currentExpenses.sort((a,b) => {
          return a.expense.amount - b.expense.amount;
        });
        break;
      case 'byCostHighToLow':
        this.currentExpenses.sort((a,b) => {
          return b.expense.amount - a.expense.amount;
        });
        break;
      case 'byDateStartSoonToFar':
        this.currentExpenses.sort((a,b) => {
          let aDate: Date, bDate: Date;
          if(!b.begin) bDate = new Date(0);
          else bDate = new Date(b.begin)
          if(!a.begin) aDate = new Date(0);
          else aDate = new Date(a.begin)
          return aDate.valueOf() - bDate.valueOf()
        });
        break;
      case 'byDateStartFarToSoon':
        this.currentExpenses.sort((a,b) => {
          let aDate, bDate: Date;
          if(!b.begin) bDate = new Date(0);
          else bDate = new Date(b.begin)
          if(!a.begin) aDate = new Date(0);
          else aDate = new Date(a.begin)
          return bDate.valueOf() - aDate.valueOf()
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
