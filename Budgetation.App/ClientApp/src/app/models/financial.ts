import {cValidator, eValidationType, iValidator} from "./validation";

export interface iIncome {
  name: string;
  amount: number;
  type: eIncomeType;
  received: boolean;
  begin: Date;
  due: Date;
  reoccurrence: eReoccurrence;
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

export enum eReoccurrence {
  Single,
  Weekly,
  Biweekly,
  Monthly,
  Quaterly,
  Biquarterly,
  Yearly
}

export enum eIncomeType {
  Hourly,
  Salary,
  Interest
}

export enum eExpenseType {
  Need = 'Need',
  Want = 'Want',
  Extra = 'Extra'
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
