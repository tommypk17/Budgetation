import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  cExpenseTypes,
  cIncomeTypes,
  cReoccurrences,
  eReoccurrence,
  iBill,
  iIncome
} from "../../../../../models/financial";

@Component({
  selector: 'app-new-income-block',
  templateUrl: './new-income-block.component.html',
  styleUrls: ['./new-income-block.component.scss']
})
export class NewIncomeBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<iIncome> = new EventEmitter<iIncome>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('income') income: iIncome | undefined;

  invalid: boolean = true;

  incomeTypes: cIncomeTypes = new cIncomeTypes();

  constructor() { }

  ngOnInit(): void {
  }

  public saveIncome(): void {
    this.save.next(this.income);
  }

  public cancelNewIncome(): void {
    this.cancel.next();
  }

  public checkValid(): void {
    let keys = Object.keys(this.income);
    this.invalid = false;
    keys.forEach((v, i, a) => {
      if(this.income[v] == null || this.income[v] == undefined){
        this.invalid = true;
      }
    });
  }

}
