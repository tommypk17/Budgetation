import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {Income} from "../../../../../models/financial";

@Component({
  selector: 'app-existing-income-block',
  templateUrl: './existing-income-block.component.html',
  styleUrls: ['./existing-income-block.component.scss']
})
export class ExistingIncomeBlockComponent implements OnInit {

  @Input('income') income: Income | undefined;
  @Output('save') save: Subject<Income> = new Subject<Income>();
  @Output('delete') delete: Subject<Income> = new Subject<Income>();

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

  saveIncome(income: Income): void {
    this.save.next(income);
  }

  deleteIncome(income: Income): void {
    this.delete.next(income);
  }
}
