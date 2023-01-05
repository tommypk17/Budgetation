import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {iResponse} from "../models/response";
import {Budget, BudgetExpense} from "../models/financial";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";
import {KeyValue} from "@angular/common";

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

  public createBudget(budget: Budget): Observable<iResponse<Budget>> {
    this.sharedService.queueLoading('createBudget');
    return this.http.post<iResponse<Budget>>(environment.URL + '/api/budgets', budget).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Budget>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('createBudget');
      })
    );
  }

  public updateBudget(budget: Budget): Observable<iResponse<Budget>> {
    this.sharedService.queueLoading('updateBudget');
    return this.http.put<iResponse<Budget>>(environment.URL + `/api/budgets`, budget).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Budget>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('updateBudget');
      })
    );
  }

  public deleteBudget(budget: Budget): Observable<iResponse<Budget>> {
    this.sharedService.queueLoading('deleteBudget');
    return this.http.delete<iResponse<Budget>>(environment.URL + `/api/budgets/${budget.id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Budget>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('deleteBudget');
      })
    );
  }

  public getBudgetExpenses(id: string): Observable<iResponse<KeyValue<string, BudgetExpense>[]>> {
    this.sharedService.queueLoading('getBudgetExpenses');
    return this.http.get<iResponse<KeyValue<string, BudgetExpense>[]>>(environment.URL + `/api/budgets/${id}/expenses`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<KeyValue<string, BudgetExpense>[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getBudgetExpenses');
      })
    );
  }

  public createBudgetExpense(budgetId: string, budgetExpense: BudgetExpense): Observable<iResponse<BudgetExpense>> {
    this.sharedService.queueLoading('createBudgetExpense');
    return this.http.post<iResponse<BudgetExpense>>(environment.URL + `/api/budgets/${budgetId}/expenses`, budgetExpense).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<BudgetExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('createBudgetExpense');
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
    return null;
  }
}
