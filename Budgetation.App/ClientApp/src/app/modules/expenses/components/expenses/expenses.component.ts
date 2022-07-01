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

  allBills: iBill[] = [];
  currentBills: iBill[] = [];

  currentSort: string | undefined;
  currentFilter: string | undefined;

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.getAllBills();
  }

  getAllBills(): void {
    this.billService.getAllBills().subscribe((res:iResponse<iBill[]>) => {
      if(res && res.data){
        this.allBills = res.data;
        this.currentBills = this.allBills;
        this.sortBills('byDateDueSoonToFar');
      }
    });
  }

  saveNewBill(bill: iBill): void {
    if(!bill.paid) bill.paid = !!bill.paid;
    this.billService.saveBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        this.allBills.push(res.data);
        this.newBill = undefined;
        this.reFilterSort();
      }
    });
  }

  saveExistingBill(bill: iBill): void {
    if(!bill.paid) bill.paid = !!bill.paid;
    if(bill.paid && !bill.paidOn) bill.paidOn = new Date(Date.now());
    this.billService.updateBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        let existingBillIdx = this.allBills.findIndex(x => x.id == bill.id);
        if(existingBillIdx > -1){
          this.allBills[existingBillIdx] = res.data;
        }
        this.reFilterSort();
      }
    });
  }

  deleteBill(bill: iBill): void {
    this.billService.deleteBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        let billIdx = this.allBills.findIndex(x => x.id == bill.id);
        this.allBills.splice(billIdx, 1);
        this.currentBills = this.allBills
      }
    });
  }

  markBillPaid(bill: iBill): void {
    bill.paid = !!!bill.paid;
    if(bill.paid && !bill.paidOn) bill.paidOn = new Date(Date.now());
    this.billService.updateBill(bill).subscribe((res: iResponse<iBill>) => {
      if(res && res.data){
        let existingBillIdx = this.allBills.findIndex(x => x.id == bill.id);
        if(existingBillIdx > -1){
          this.allBills[existingBillIdx] = res.data;
        }
        this.reFilterSort();
      }
    });
  }

  reFilterSort(): void {
    if(this.currentSort) this.sortBills(this.currentSort);
    if(this.currentFilter) this.filterBills(this.currentFilter);
  }

  createNewBill(): void {
    this.newBill = new cBill();
  }

  cancelNewBill(): void {
    this.newBill = undefined;
  }

  filterBills(filterBy: string): void {
    this.currentFilter = filterBy;
    switch (filterBy){
      case 'clear':
        this.currentBills = this.allBills;
        this.currentFilter = undefined;
        break;
      case 'need':
        this.currentBills = this.allBills.filter(x => x.expense.type == eExpenseType.Need);
        break;
      case 'want':
        this.currentBills = this.allBills.filter(x => x.expense.type == eExpenseType.Want);
        break;
      case 'extra':
        this.currentBills = this.allBills.filter(x => x.expense.type == eExpenseType.Extra);
        break;
    }
  }

  sortBills(sortOrder: string): void {
    this.currentSort = sortOrder;
    this.currentBills = this.allBills;
    let keyVal = [];
    let i = 0;
    Object.keys(eExpenseType).forEach((v) => {
      keyVal[eExpenseType[v]] = i;
      i++;
    });
    switch (sortOrder){
      case 'clear':
        this.currentBills = this.allBills;
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
