import {Component, OnInit} from '@angular/core';
import {cBill, eExpenseType, iBill} from "../../../../models/financial";
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
    this.getAllBills();
  }

  getAllBills(): void {
    this.billService.getAllBills().subscribe((res:iResponse<iBill[]>) => {
      if(res && res.data){
        this.currentBills = res.data;
        this.sortBills('byDateDueSoonToFar');
      }
    });
  }

  saveNewBill(bill: iBill): void {
    if(!bill.paid) bill.paid = !!bill.paid;
    this.billService.saveBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        this.currentBills.push(res.data);
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

  deleteBill(bill: iBill): void {
    this.billService.deleteBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        let billIdx = this.currentBills.findIndex(x => x.id == bill.id);
        this.currentBills.splice(billIdx);
      }
    });
  }

  createNewBill(): void {
    this.newBill = new cBill();
  }

  cancelNewBill(): void {
    this.newBill = undefined;
  }

  filterBills(filterBy: string): void {
    switch (filterBy){
      case 'clear':
        this.getAllBills();
        break;
      case 'need':
        this.currentBills = this.currentBills.filter(x => x.expense.type == eExpenseType.Need);
        break;
      case 'want':
        this.currentBills = this.currentBills.filter(x => x.expense.type == eExpenseType.Want);
        break;
      case 'extra':
        this.currentBills = this.currentBills.filter(x => x.expense.type == eExpenseType.Extra);
        break;
    }
  }

  sortBills(sortOrder: string): void {
    let keyVal = [];
    let i = 0;
    Object.keys(eExpenseType).forEach((v) => {
      keyVal[eExpenseType[v]] = i;
      i++;
    });
    switch (sortOrder){
      case 'clear':
        this.getAllBills();
        break;
      case 'byTypeNeedToExtra':
        this.currentBills.sort( (a,b ) => {
          return keyVal[a.expense.type] - keyVal[b.expense.type];
        });
        break;
      case 'byTypeExtraToNeed':
        this.currentBills.sort( (a,b ) => {
          return keyVal[b.expense.type] - keyVal[a.expense.type];
        });
        break;
      case 'byCostLowToHigh':
        this.currentBills.sort((a,b) => {
          return a.expense.amount - b.expense.amount;
        });
        break;
      case 'byCostHighToLow':
        this.currentBills.sort((a,b) => {
          return b.expense.amount - a.expense.amount;
        });
        break;
      case 'byDateStartSoonToFar':
        this.currentBills.sort((a,b) => {
          let aDate: Date, bDate: Date;
          if(!b.begin) bDate = new Date(0);
          else bDate = new Date(b.begin)
          if(!a.begin) aDate = new Date(0);
          else aDate = new Date(a.begin)
          return aDate.valueOf() - bDate.valueOf()
        });
        break;
      case 'byDateStartFarToSoon':
        this.currentBills.sort((a,b) => {
          let aDate, bDate: Date;
          if(!b.begin) bDate = new Date(0);
          else bDate = new Date(b.begin)
          if(!a.begin) aDate = new Date(0);
          else aDate = new Date(a.begin)
          return bDate.valueOf() - aDate.valueOf()
        });
        break;
      case 'byDateDueSoonToFar':
        this.currentBills.sort((a,b) => {
          let aDate, bDate: Date;
          if(!b.due) bDate = new Date(0);
          else bDate = new Date(b.due)
          if(!a.due) aDate = new Date(0);
          else aDate = new Date(a.due)
          return aDate.valueOf() - bDate.valueOf()
        });
        break;
      case 'byDateDueFarToSoon':
        this.currentBills.sort((a,b) => {
          let aDate, bDate: Date;
          if(!b.due) bDate = new Date(0);
          else bDate = new Date(b.due)
          if(!a.due) aDate = new Date(0);
          else aDate = new Date(a.due)
          return bDate.valueOf() - aDate.valueOf()
        });
        break;
    }
  }

}
