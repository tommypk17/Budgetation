import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {eIncomeType, Income} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";

@Component({
  selector: 'app-new-income-block',
  templateUrl: './new-income-block.component.html',
  styleUrls: ['./new-income-block.component.scss']
})
export class NewIncomeBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<Income> = new EventEmitter<Income>();
  @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('income') income: Income | undefined;

  invalid: boolean = true;

  incomeTypes: KeyValue<number, string>[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.incomeTypes = this.sharedService.incomeTypes;
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
