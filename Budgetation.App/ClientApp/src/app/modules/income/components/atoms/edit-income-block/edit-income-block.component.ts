import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {eIncomeType, Income} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-edit-income-block',
  templateUrl: './edit-income-block.component.html',
  styleUrls: ['./edit-income-block.component.scss']
})
export class EditIncomeBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<Income> = new EventEmitter<Income>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('income') income: Income | undefined;

  invalid: boolean = true;

  incomeTypes: KeyValue<number, string>[] = [];

  constructor() { }

  ngOnInit(): void {
    Object.keys(eIncomeType).forEach((v) => {
      this.incomeTypes.push({key: eIncomeType[v], value: v});
    })
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
