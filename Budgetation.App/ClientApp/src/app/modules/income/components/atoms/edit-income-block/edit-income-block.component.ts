import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {cIncomeTypes, iIncome} from "../../../../../models/financial";

@Component({
  selector: 'app-edit-income-block',
  templateUrl: './edit-income-block.component.html',
  styleUrls: ['./edit-income-block.component.scss']
})
export class EditIncomeBlockComponent implements OnInit {

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
