import {KeyValue} from "@angular/common";

export class Income {
  id?: string;
  incomingBalance: number = 0;
  amount: number = 0;
  date: Date = new Date(Date.now());
  type: eIncomeType;
}

export abstract class AbstractExpense {
  id?: string;
  name: string;
  amount: number = 0;
  type: eExpenseType;
  paidOn?: Date = undefined;

  [key: string]: any;
}

export class SingleExpense extends AbstractExpense {

}

export class RecurringExpense extends AbstractExpense {
  reoccurrenceId?: string;
  interval: eReoccurrence;
  due: Date = new Date(Date.now());
}

export enum eReoccurrence {
  Single = 'Single',
  Weekly = 'Weekly',
  Biweekly = 'Biweekly',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Biquarterly = 'Biquarterly',
  Yearly = 'Yearly'
}

export enum eIncomeType {
  Hourly = 'Hourly',
  Salary = 'Salary',
  Interest = 'Interest',
  Other = 'Other'
}

export enum eExpenseType {
  Need = 'Need',
  Want = 'Want',
  Extra = 'Extra'
}
