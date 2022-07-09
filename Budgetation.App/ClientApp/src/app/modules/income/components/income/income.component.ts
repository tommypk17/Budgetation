import { Component, OnInit } from '@angular/core';
import {Income, eExpenseType, eIncomeType} from "../../../../models/financial";
import {iResponse} from "../../../../models/response";
import {IncomeService} from "../../../../services/income.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  headerBlock = {blockTitle: "Income", blockSubtitle: "", blockContent: ""};

  newIncome: Income | undefined;

  currentIncome: Income[] = [];

  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.getAllIncome();
  }

  getAllIncome(): void {
    this.incomeService.getAllIncome().subscribe((res:iResponse<Income[]>) => {
      if(res && res.data){
        this.currentIncome = res.data;
        this.sortIncome('byDateSoonToFar');
      }
    });
  }

  saveNewIncome(income: Income): void {
    this.incomeService.saveIncome(income).subscribe((res: iResponse<Income>) => {
      if(res && res.data){
        this.currentIncome.push(res.data);
        this.newIncome = undefined;
      }
    });
  }

  saveExistingIncome(income: Income): void {
    this.incomeService.updateIncome(income).subscribe((res: iResponse<Income>) => {
      if(res && res.data){
        let existingIncomeIdx = this.currentIncome.findIndex(x => x.id == income.id);
        if(existingIncomeIdx > -1){
          this.currentIncome[existingIncomeIdx] = res.data;
        }
      }
    });
  }

  deleteIncome(income: Income): void {
    this.incomeService.deleteIncome(income).subscribe((res: iResponse<Income>) => {
      if(res && res.data){
        let incomeIdx = this.currentIncome.findIndex(x => x.id == income.id);
        this.currentIncome.splice(incomeIdx);
      }
    });
  }

  createNewIncome(): void {
    this.newIncome = new Income();
  }

  cancelNewIncome(): void {
    this.newIncome = undefined;
  }

  filterIncome(filterBy: string): void {
    switch (filterBy){
      case 'clear':
        this.getAllIncome();
        break;
      case 'salary':
        this.currentIncome = this.currentIncome.filter(x => x.type == eIncomeType.Salary);
        break;
      case 'hourly':
        this.currentIncome = this.currentIncome.filter(x => x.type == eIncomeType.Hourly);
        break;
      case 'interest':
        this.currentIncome = this.currentIncome.filter(x => x.type == eIncomeType.Interest);
        break;
      case 'other':
        this.currentIncome = this.currentIncome.filter(x => x.type == eIncomeType.Other);
        break;
    }
  }

  sortIncome(sortOrder: string): void {
    let keyVal = [];
    let i = 0;
    Object.keys(eExpenseType).forEach((v) => {
      keyVal[eExpenseType[v]] = i;
      i++;
    });
    switch (sortOrder){
      case 'clear':
        this.getAllIncome();
        break;
      case 'byTypeSalaryToOther':
        this.currentIncome.sort( (a,b ) => {
          return keyVal[a.type] - keyVal[b.type];
        });
        break;
      case 'byTypeOtherToSalary':
        this.currentIncome.sort( (a,b ) => {
          return keyVal[b.type] - keyVal[a.type];
        });
        break;
      case 'byAmountLowToHigh':
        this.currentIncome.sort((a,b) => {
          return a.amount - b.amount;
        });
        break;
      case 'byAmountHighToLow':
        this.currentIncome.sort((a,b) => {
          return b.amount - a.amount;
        });
        break;
      case 'byDateSoonToFar':
        this.currentIncome.sort((a,b) => {
          let aDate: Date, bDate: Date;
          if(!b.date) bDate = new Date(0);
          else bDate = new Date(b.date)
          if(!a.date) aDate = new Date(0);
          else aDate = new Date(a.date)
          return aDate.valueOf() - bDate.valueOf()
        });
        break;
      case 'byDateFarToSoon':
        this.currentIncome.sort((a,b) => {
          let aDate: Date, bDate: Date;
          if(!b.date) bDate = new Date(0);
          else bDate = new Date(b.date)
          if(!a.date) aDate = new Date(0);
          else aDate = new Date(a.date)
          return bDate.valueOf() - aDate.valueOf()
        });
        break;
    }
  }

}
