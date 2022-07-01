import {cValidator, eValidationType, iValidator} from "./validation";

export interface iIncome {
  id?: string;
  type: string;
  incomingBalance: number;
  amount: number;
  date: Date;
}

export interface iExpense {
  name: string;
  amount: number;
  type: eExpenseType;
}

export interface iBill {
  id?: string;
  expense: iExpense;
  begin: Date;
  due: Date;
  paidOn: Date;
  paid: boolean;
  reoccurrence: eReoccurrence;

  validation: iValidator;
}

export interface iExpenseType {
  display: string;
  value: eExpenseType;
}

export interface iReoccurrence {
  display: string;
  value: eReoccurrence;
}

export interface iIncomeType {
  display: string;
  value: eIncomeType;
}

export enum eReoccurrence {
  Single = 'Single',
  Weekly = 'Weekly',
  Biweekly = 'Biweekly',
  Monthly = 'Monthly',
  Quaterly = 'Quaterly',
  Biquarterly = 'Biquaterly',
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

export class cIncome implements iIncome {
  id?: string;
  incomingBalance: number = 0;
  amount: number = 0;
  date: Date = new Date(Date.now());
  type: eIncomeType | null = null;

  [key: string]: any;
}

export class cExpense implements iExpense {
  amount: number | null = null;
  name: string | null = null;
  type: eExpenseType | null = null;

  [key: string]: any;
}

export class cBill implements iBill {
  id?: string;
  begin: Date | null = null;
  due: Date | null = null;
  paidOn: Date | null = null;
  expense: iExpense | null = new cExpense();
  paid: boolean | null = null;
  reoccurrence: eReoccurrence | null = null;

  [key: string]: any;

  validation: iValidator = new cValidator([
    {
      fieldName: 'name',
      fieldValue: this.expense.name,
      validationTypes: [
        eValidationType.isNotNull,
        eValidationType.isNotEmpty,
      ]
    },
    {
      fieldName: 'amount',
      fieldValue: this.expense.amount,
      validationTypes: [
        eValidationType.isNotNull,
        eValidationType.isNotEmpty,
        eValidationType.isNumber
      ]
    },
    {
      fieldName: 'type',
      fieldValue: this.expense.type,
      validationTypes: [
        eValidationType.isNotNull
      ]
    },
    {
      fieldName: 'reoccurrence',
      fieldValue: this.reoccurrence,
      validationTypes: [
        eValidationType.isNotNull,
      ]
    },
    {
      fieldName: 'begin',
      fieldValue: this.begin,
      validationTypes: [
        eValidationType.isDate,
        eValidationType.isNotRequired
        ]
    },
    {
      fieldName: 'due',
      fieldValue: this.due,
      validationTypes: [
        eValidationType.isDate
      ]
    },
    {
      fieldName: 'paid',
      fieldValue: this.paid,
      validationTypes: [
        eValidationType.isNotNull
      ]
    },
  ])
}

export class cIncomeType implements iIncomeType {
  display: string;
  value: eIncomeType;
}

export class cExpenseType implements iExpenseType {
  display: string;
  value: eExpenseType;
}

export class cReoccurrence implements iReoccurrence {
  display: string;
  value: eReoccurrence;
}

export class cExpenseTypes {
  types: cExpenseType[] = [
    {
      display: "Need",
      value: eExpenseType.Need
    },
    {
      display: "Want",
      value: eExpenseType.Want
    },
    {
      display: "Extra",
      value: eExpenseType.Extra
    },
  ]
}

export class cIncomeTypes {
  types: cIncomeType[] = [
    {
      display: "Salary",
      value: eIncomeType.Salary
    },
    {
      display: "Hourly",
      value: eIncomeType.Hourly
    },
    {
      display: "Interest",
      value: eIncomeType.Interest
    },
    {
      display: "Other",
      value: eIncomeType.Other
    }
  ]
}

export class cReoccurrences {
  reoccurrences: cReoccurrence[] = [
    {
      display: "Single",
      value: eReoccurrence.Single
    },
    {
      display: "Weekly",
      value: eReoccurrence.Weekly
    },
    {
      display: "Biweekly",
      value: eReoccurrence.Biweekly
    },
    {
      display: "Monthly",
      value: eReoccurrence.Monthly
    },
    {
      display: "Biquarterly",
      value: eReoccurrence.Biquarterly
    },
    {
      display: "Quaterly",
      value: eReoccurrence.Quaterly
    },
    {
      display: "Yearly",
      value: eReoccurrence.Yearly
    },
  ]
}
