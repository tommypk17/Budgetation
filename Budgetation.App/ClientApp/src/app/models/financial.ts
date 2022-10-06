import {eValidationType, iValidationField, Validator} from "./validation";

export class Income extends Validator{
  id?: string;
  incomingBalance: number = 0;
  amount: number = 0;
  date: Date = new Date(Date.now());
  type: eIncomeType;

  validationFields: iValidationField[] = [
    {fieldName: 'incomingBalance', validationTypes: [eValidationType.isNotEmpty, eValidationType.isNotNull, eValidationType.isNumber]},
    {fieldName: 'amount', validationTypes: [eValidationType.isNotEmpty, eValidationType.isNotNull, eValidationType.isNumber]},
    {fieldName: 'date', validationTypes: [eValidationType.isNotEmpty, eValidationType.isNotNull, eValidationType.isDate]},
    {fieldName: 'type', validationTypes: [eValidationType.isNotEmpty, eValidationType.isNotNull]}
  ];
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
