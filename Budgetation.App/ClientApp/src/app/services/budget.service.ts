import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {iResponse} from "../models/response";
import {AbstractExpense, Budget} from "../models/financial";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllBudgets(): Observable<iResponse<Budget[]>> {
    this.sharedService.queueLoading('getAllBudgets');
    return this.http.get<iResponse<Budget[]>>(environment.URL + '/api/budgets').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Budget[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllBudgets');
      })
    );
  }

  public getBudget(id: string): Observable<iResponse<Budget>> {
    this.sharedService.queueLoading('getAllBudgets');
    return this.http.get<iResponse<Budget>>(environment.URL + `/api/budgets/${id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Budget>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllBudgets');
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
    return null;
  }
}
