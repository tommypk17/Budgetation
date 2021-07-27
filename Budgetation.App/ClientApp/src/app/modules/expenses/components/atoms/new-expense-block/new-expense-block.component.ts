import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {
  cBill,
  cExpenseTypes,
  cReoccurrences,
  eExpenseType,
  eReoccurrence,
  iBill
} from "../../../../../models/financial";


@Component({
  selector: 'app-new-expense-block',
  templateUrl: './new-expense-block.component.html',
  styleUrls: ['./new-expense-block.component.scss']
})
export class NewExpenseBlockComponent implements OnInit {

  @Output('save') save: EventEmitter<iBill> = new EventEmitter<iBill>();
  @Input('bill') bill: iBill | undefined;

  invalid: boolean = true;

  expenseTypes: cExpenseTypes = new cExpenseTypes();
  reoccurrences: cReoccurrences = new cReoccurrences();

  constructor() { }

  ngOnInit(): void {
  }

  public saveBill(): void {
    if(this.bill.reoccurrence == eReoccurrence.Single){
      this.bill.begin = null;
    }
    this.save.next(this.bill);
  }

  clearReoccur(reoccurrence: eReoccurrence){
    if(reoccurrence == eReoccurrence.Single) {
      this.bill.begin = null;
    }
  }

  public checkValid(): void {
    let keys = Object.keys(this.bill);
    this.invalid = false;
    keys.forEach((v, i, a) => {
      if(this.bill[v] == null || this.bill[v] == undefined){
        if(v != 'begin' && v != 'paid'){
          this.invalid = true;
        }
      }
    });
  }

}
