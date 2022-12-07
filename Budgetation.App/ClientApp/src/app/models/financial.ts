import {KeyValue} from "@angular/common";

export class Income{
  id?: string;
  incomingBalance: number = 0;
  amount: number = 0;
  date: Date = new Date(Date.now());
  type: eIncomeType;
}

export abstract class AbstractExpense{
  id?: string;
  name: string = '';
  amount: number = 0;
  type: eExpenseType;
  paidOn?: Date = undefined;
  due: Date = new Date(Date.now());
  reoccurs: boolean = false;

  public static getInstance(expense: any): string{
    if(expense.interval != undefined){
      return 'RecurringExpense';
    }else{
      return 'SingleExpense';
    }
  }

  [key: string]: any;
}

export class SingleExpense extends AbstractExpense {

}

export class RecurringExpense extends AbstractExpense {
  reoccurrenceId?: string;
  interval: eReoccurrence;
}

export enum eReoccurrence {
  Weekly ,
  Biweekly ,
  Monthly ,
  Quarterly ,
  Biquarterly ,
  Yearly
}

export enum eIncomeType {
  Hourly,
  Salary,
  Interest,
  Other
}

export enum eIncomeFor {
  All= "All",
  Current = "This Month",
  Month = "Month"
}

export enum eExpenseType {
  Need ,
  Want ,
  Extra
}


export enum eExpensesFor {
  All= "All",
  Current = "This Month",
  Month = "Month"
}

export interface Budget {
  id?: string;
  userId?: string;
  whatIf: boolean;
  salary: number;
  netMonthlyPay: number;
  netMonthlyDeductions: number;
  expenses: KeyValue<string, BudgetExpense>[];
}

export interface BudgetExpense {
  name: string;
  amount: number;
  type: eBudgetExpenseType
}

export enum eBudgetExpenseType {
  Need,
  Want,
  Extra
}
