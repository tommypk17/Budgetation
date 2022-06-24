import {Component, Input, OnInit, Output} from '@angular/core';
import {iBill} from "../../../../../models/financial";
import {Subject} from "rxjs";
import {B} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-existing-expense-block',
  templateUrl: './existing-expense-block.component.html',
  styleUrls: ['./existing-expense-block.component.scss']
})
export class ExistingExpenseBlockComponent implements OnInit {

  @Input('bill') bill: iBill | undefined;
  @Output('save') save: Subject<iBill> = new Subject<iBill>();
  @Output('delete') delete: Subject<iBill> = new Subject<iBill>();

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

  saveBill(bill: iBill): void {
    this.save.next(bill);
  }

  deleteBill(bill: iBill): void {
    this.delete.next(bill);
  }
}
