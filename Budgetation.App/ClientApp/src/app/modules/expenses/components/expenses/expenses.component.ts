import {Component, OnInit} from '@angular/core';
import {cBill, eExpenseType, eReoccurrence, iBill} from "../../../../models/financial";
import {BillService} from "../../../../services/bill.service";
import {iResponse} from "../../../../models/response";

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
    this.billService.getAllBills().subscribe((res:iResponse<iBill[]>) => {
      if(res && res.data){
        this.currentBills = res.data;
      }
    });
  }

  saveNewBill(bill: iBill): void {
    if(!bill.paid) bill.paid = !!bill.paid;
    this.currentBills.push(bill);
    this.billService.saveBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        this.newBill = undefined;
      }
    });
  }

  saveExistingBill(bill: iBill): void {
    if(!bill.paid) bill.paid = !!bill.paid;
    this.billService.updateBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        let existingBillIdx = this.currentBills.findIndex(x => x.id == bill.id);
        if(existingBillIdx > -1){
          this.currentBills[existingBillIdx] = res.data;
        }
      }
    });
  }

  createNewBill(): void {
    this.newBill = new cBill();
  }

  cancelNewBill(): void {
    this.newBill = undefined;
  }

  filterBills(): void {
    console.log('filter')
  }

  sortBills(sortOrder: string): void {
    console.log(sortOrder);
  }

}
