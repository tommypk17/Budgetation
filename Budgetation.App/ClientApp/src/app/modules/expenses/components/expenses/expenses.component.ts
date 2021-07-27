import {Component, OnInit} from '@angular/core';
import {cBill, eExpenseType, eReoccurrence, iBill} from "../../../../models/financial";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  headerBlock = {blockTitle: "Expenses", blockSubtitle: "", blockContent: ""};

  newBill: iBill | undefined;

  currentBills: iBill[] = [];

  constructor() { }

  ngOnInit(): void {
    let tempBill: iBill = {
      expense: {name: 'test', type: eExpenseType.Need, amount: 100},
      due: new Date('2020-01-01'),
      paid: false,
      reoccurrence: eReoccurrence.Single,
      begin: null,
      validation: null
    }
    this.currentBills.push(tempBill);
  }

  saveNewBill(bill: iBill): void {
    //TODO: save bill to DB & add to currentBill List
    this.currentBills.push(bill);
    this.newBill = undefined;
  }

  createNewBill(): void {
    this.newBill = new cBill();
  }

  filterBills(): void {
    console.log('filter')
  }

  sortBills(sortOrder: string): void {
    console.log(sortOrder);
  }

}
