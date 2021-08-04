import {Component, Input, OnInit} from '@angular/core';
import {iBill} from "../../../../../models/financial";

@Component({
  selector: 'app-existing-expense-block',
  templateUrl: './existing-expense-block.component.html',
  styleUrls: ['./existing-expense-block.component.scss']
})
export class ExistingExpenseBlockComponent implements OnInit {

  @Input('bill') bill: iBill | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  displayDate(inDate: Date): string {
    let date: Date;
    if(inDate != null) {
      let date: Date = new Date(inDate);
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }
  }
}
