import {Component, OnInit} from '@angular/core';
import {cBill, eExpenseType, eReoccurrence, iBill} from "../../../../models/financial";
import {BillService} from "../../../../services/bill.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  headerBlock = {blockTitle: "Expenses", blockSubtitle: "", blockContent: ""};

  newBill: iBill | undefined;

  currentBills: iBill[] = [];

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getAllBills().subscribe((res:iBill[]) => {
      if(res){
        this.currentBills = res;
      }
    });
  }

  saveNewBill(bill: iBill): void {
    if(!bill.paid) bill.paid = !!bill.paid;
    this.currentBills.push(bill);
    this.billService.saveBill(bill).subscribe((res: iBill) => {
      if(res){
        this.newBill = undefined;
      }
    });
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
