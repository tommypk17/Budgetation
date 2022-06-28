import {Component, Input, OnInit, Output} from '@angular/core';
import {iBill, iIncome} from "../../../../../models/financial";
import {Subject} from "rxjs";

@Component({
  selector: 'app-existing-income-block',
  templateUrl: './existing-income-block.component.html',
  styleUrls: ['./existing-income-block.component.scss']
})
export class ExistingIncomeBlockComponent implements OnInit {

  @Input('income') income: iIncome | undefined;
  @Output('save') save: Subject<iIncome> = new Subject<iIncome>();
  @Output('delete') delete: Subject<iIncome> = new Subject<iIncome>();

  edit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  displayDate(inDate: Date): string {
    let date: Date;
    if(inDate != null) {
      let date: Date = new Date(inDate);
      return date.toLocaleDateString();
    }
  }

  saveIncome(income: iIncome): void {
    this.save.next(income);
  }

  deleteIncome(income: iIncome): void {
    this.delete.next(income);
  }
}
