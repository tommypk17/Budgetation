import { Component, OnInit } from '@angular/core';
import {Income, eIncomeType, eExpensesFor, eIncomeFor} from "../../../../models/financial";
import {iResponse} from "../../../../models/response";
import {IncomeService} from "../../../../services/income.service";
import {UserPreferencesService} from "../../../../services/user-preferences.service";
import {UserPreference} from "../../../../models/user";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  headerBlock = {blockTitle: "Income", blockSubtitle: "", blockContent: ""};

  newIncome: Income | undefined;

  allIncome: Income[] = [];
  currentIncome: Income[] = [];

  currentSort: string | undefined;
  currentFilter: string | undefined;

  currentIncomeFor: string = eIncomeFor.Current;
  currentMonth: Date;

  display: string = 'list';


  constructor(private incomeService: IncomeService, private userPreferenceService: UserPreferencesService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getAllIncome();
    let pref = this.userPreferenceService.getPreference("incomeDisplay");
    if(pref) this.display = pref.value;
  }

  getAllIncome(): void {
    this.incomeService.getAllIncome().subscribe((res:iResponse<Income[]>) => {
      if(res && res.data){
        this.allIncome = res.data;
        this.currentIncome = res.data;
        this.sortIncome('byDateSoonToFar');
        this.showIncome(this.currentIncomeFor);
      }
    });
  }

  saveNewIncome(income: Income): void {
    this.incomeService.saveIncome(income).subscribe((res: iResponse<Income>) => {
      if(res && res.data){
        this.allIncome.push(res.data);
        this.newIncome = undefined;
        this.reFilterSort();
      }
    });
  }

  saveExistingIncome(income: Income): void {
    this.incomeService.updateIncome(income).subscribe((res: iResponse<Income>) => {
      if(res && res.data){
        let existingIncomeIdx = this.allIncome.findIndex(x => x.id == income.id);
        if(existingIncomeIdx > -1){
          this.allIncome[existingIncomeIdx] = res.data;
        }
        this.reFilterSort();
      }
    });
  }

  deleteIncome(income: Income): void {
    this.incomeService.deleteIncome(income).subscribe((res: iResponse<Income>) => {
      if(res && res.data){
        let incomeIdx = this.allIncome.findIndex(x => x.id == income.id);
        this.allIncome.splice(incomeIdx, 1);
        this.reFilterSort();
      }
    });
  }

  createNewIncome(): void {
    this.newIncome = new Income();
  }

  cancelNewIncome(): void {
    this.newIncome = undefined;
  }

  showIncome(incomeFor: string){
    this.currentIncomeFor = incomeFor;
    switch (incomeFor){
      case eExpensesFor.All:
        this.currentMonth = undefined;
        this.currentIncome = this.allIncome;
        break;
      case eExpensesFor.Current:
        this.currentMonth = new Date(Date.now());
        this.currentIncome = this.allIncome.filter(x => new Date(x.date) >= this.sharedService.firstDayOfMonthCurrent);
        this.currentIncome = this.currentIncome.filter(x => new Date(x.date) <= this.sharedService.lastDayOfMonthCurrent);
        break;
      case eExpensesFor.Month:
        this.filterByMonth(this.currentMonth)
        break;
    }
    this.currentFilter = undefined;
  }

  reFilterSort(): void {
    this.currentIncome = this.allIncome;
    if(this.currentSort) this.sortIncome(this.currentSort);
    if(this.currentFilter) this.filterIncome(this.currentFilter);
    this.showIncome(this.currentIncomeFor);
  }

  showMonth(date: Date){
    this.reFilterSort();
    this.currentMonth = date;
    this.filterByMonth(date);
    this.currentIncomeFor = eExpensesFor.Month;
  }

  filterByMonth(date: Date | undefined){
    if(date){
      this.currentIncome = this.allIncome.filter(x => new Date(x.date) >= date);
      this.currentIncome = this.currentIncome.filter(x => new Date(x.date) <= new Date(date.getFullYear(), date.getMonth() + 1, 0));
    }
  }

  filterIncome(filterBy: string): void {
    this.currentFilter = filterBy;
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
    this.currentSort = sortOrder;
    this.currentIncome = this.allIncome;
    let keyVal = [];
    let i = 0;
    Object.keys(eIncomeType).forEach((v) => {
      keyVal[eIncomeType[v]] = i;
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

  changeSettings(event: UserPreference): void {
    this.userPreferenceService.setPreference(event);
    if(event.key == 'incomeDisplay') this.display = event.value;
  }

}
