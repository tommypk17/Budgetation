import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {KeyValue} from "@angular/common";
import {
  eBudgetExpenseType,
  eExpensesFor,
  eExpenseType,
  eIncomeFor,
  eIncomeType,
  eReoccurrence
} from "../models/financial";
import {UrlSegment} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navigationToggled: Subject<void> = new Subject<void>();
  loading: Subject<boolean> = new Subject<boolean>();
  screenWidth: Subject<number> = new Subject<number>();
  loadingQueue: string[] = [];

  constructor(private http: HttpClient) { }

  changeScreenWidth(size: number){
    this.screenWidth.next(size);
  }

  navigationToggle(): void {
    return this.navigationToggled.next();
  }

  queueLoading(section: string): void {
    let foundIdx = this.loadingQueue.findIndex(x => x == section);
    if(foundIdx < 0){
      this.loadingQueue.push(section);
    }
    if(this.loadingQueue.length > 0){
      this.loading.next(true);
    }
  }

  dequeueLoading(section: string): void {
    let foundIdx = this.loadingQueue.findIndex(x => x == section);
    if(foundIdx >= 0) {
      this.loadingQueue.splice(foundIdx, 1);
    }
    if(this.loadingQueue.length <= 0){
      this.loading.next(false);
    }
  }

  clearLoading(): void {
    this.loadingQueue = [];
    this.loading.next(false);
  }

  get incomeTypes(): KeyValue<number, string>[] {
    let incomeTypes: KeyValue<number, string>[] = [];
    Object.values(eIncomeType).filter((o) => typeof o == 'string').forEach((v) => {
      incomeTypes.push({key: eIncomeType[v], value: v as string});
    })
    return incomeTypes;
  }

  get reoccurrences(): KeyValue<number, string>[] {
    let reoccurrences: KeyValue<number, string>[] = [];
    Object.values(eReoccurrence).filter((o) => typeof o == 'string').forEach((v) => {
      reoccurrences.push({key: eReoccurrence[v], value: v as string});
    });
    return reoccurrences;
  }

  get expenseTypes(): KeyValue<number, string>[] {
    let expenseTypes: KeyValue<number, string>[] = [];
    Object.values(eExpenseType).filter((o) => typeof o == 'string').forEach((v) => {
      expenseTypes.push({key: eExpenseType[v], value: v as string});
    });
    return expenseTypes;
  }

  get budgetExpenseTypes(): KeyValue<number, string>[] {
    let expenseTypes: KeyValue<number, string>[] = [];
    Object.values(eBudgetExpenseType).filter((o) => typeof o == 'string').forEach((v) => {
      expenseTypes.push({key: eBudgetExpenseType[v], value: v as string});
    });
    return expenseTypes;
  }

  get expensesFor(): KeyValue<string, string>[] {
    let expensesFor: KeyValue<string, string>[] = [];
    Object.keys(eExpensesFor).forEach((v) => {
      expensesFor.push({key: v, value: eExpensesFor[v]});
    });
    return expensesFor;
  }

  get incomeFor(): KeyValue<string, string>[] {
    let incomeFor: KeyValue<string, string>[] = [];
    Object.keys(eIncomeFor).forEach((v) => {
      incomeFor.push({key: v, value: eIncomeFor[v]});
    });
    return incomeFor;
  }

  get firstDayOfMonthCurrent(): Date{
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  get lastDayOfMonthCurrent(): Date{
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  get firstDayOfMonthPrevious(): Date{
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 1, 1);
  }

  get lastDayOfMonthPrevious(): Date{
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 0);
  }

  moneyRound(amount: number): number{
    return Math.round(amount * 100) / 100;
  }

  get previousRoute(): string {
    let prevSegment: string = "";
    let prevSegmentString = sessionStorage.getItem('previous');
    if(prevSegmentString) {
      try{
        prevSegment = JSON.parse(prevSegmentString);
      }catch {}
    }
    return prevSegment;
  }

  set previousRoute(segments: string) {
    sessionStorage.setItem('previous', JSON.stringify(segments));
  }

}
