import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ObservableInput, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SingleExpense, RecurringExpense, AbstractExpense} from "../models/financial";
import {catchError, finalize, retry} from "rxjs/operators";
import {SharedService} from "./shared.service";
import {iResponse} from "../models/response";


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllExpenses(): Observable<iResponse<AbstractExpense[]>> {
    this.sharedService.queueLoading('getAllExpenses');
    return this.http.get<iResponse<AbstractExpense[]>>(environment.URL + '/api/expenses').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<AbstractExpense[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllExpenses');
      })
    );
  }

  public getAllSingleExpenses(): Observable<iResponse<SingleExpense[]>> {
    this.sharedService.queueLoading('getAllSingleExpenses');
    return this.http.get<iResponse<SingleExpense[]>>(environment.URL + '/api/expenses/single').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<SingleExpense[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllSingleExpenses');
      })
    );
  }

  public saveSingleExpense(expense: SingleExpense): Observable<iResponse<SingleExpense>> {
    return this.http.post<iResponse<SingleExpense>>(environment.URL + '/api/expenses/single', expense).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<SingleExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public updateSingleExpense(expense: SingleExpense): Observable<iResponse<SingleExpense>> {
    return this.http.put<iResponse<SingleExpense>>(environment.URL + `/api/expenses/single/${expense.id}`, expense).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<SingleExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public deleteSingleExpense(expense: SingleExpense): Observable<iResponse<SingleExpense>> {
    return this.http.delete<iResponse<SingleExpense>>(environment.URL + `/api/expenses/single/${expense.id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<SingleExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public getAllRecurrringExpenses(): Observable<iResponse<RecurringExpense[]>> {
    this.sharedService.queueLoading('getAllSingleExpenses');
    return this.http.get<iResponse<RecurringExpense[]>>(environment.URL + '/api/expenses/recurring').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<RecurringExpense[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllSingleExpenses');
      })
    );
  }

  public saveRecurrringExpense(expense: RecurringExpense): Observable<iResponse<RecurringExpense>> {
    return this.http.post<iResponse<RecurringExpense>>(environment.URL + '/api/expenses/recurring', expense).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<RecurringExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public updateRecurrringExpense(expense: RecurringExpense): Observable<iResponse<RecurringExpense>> {
    return this.http.put<iResponse<RecurringExpense>>(environment.URL + `/api/expenses/recurring/${expense.id}`, expense).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<RecurringExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public deleteRecurrringExpense(expense: RecurringExpense): Observable<iResponse<RecurringExpense>> {
    return this.http.delete<iResponse<RecurringExpense>>(environment.URL + `/api/expenses/recurring/${expense.id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<RecurringExpense>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public prepareReoccurrences(): Observable<iResponse<RecurringExpense[]>> {
    return this.http.get<iResponse<RecurringExpense[]>>(environment.URL + '/api/expenses/recurring/duplicate').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<RecurringExpense[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public addReoccurrences(expenses: RecurringExpense[]): Observable<iResponse<RecurringExpense[]>> {
    return this.http.post<iResponse<RecurringExpense[]>>(environment.URL + '/api/expenses/recurring/duplicate', expenses.map(x => x.id)).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<RecurringExpense[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
    return null;
  }

}
