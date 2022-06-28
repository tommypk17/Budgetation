import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {iResponse} from "../models/response";
import {iBill, iIncome} from "../models/financial";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllIncome(): Observable<iResponse<iIncome[]>> {
    this.sharedService.queueLoading('getAllIncome');
    return this.http.get<iResponse<iIncome[]>>(environment.URL + '/api/users/income').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iIncome[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllIncome');
      })
    );
  }

  public saveIncome(income: iIncome): Observable<iResponse<iIncome>> {
    this.sharedService.queueLoading('saveIncome');
    return this.http.post<iResponse<iIncome>>(environment.URL + '/api/users/income', income).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iIncome>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('saveIncome');
      })
    );
  }

  public updateIncome(income: iIncome): Observable<iResponse<iIncome>> {
    this.sharedService.queueLoading('updateIncome');
    return this.http.put<iResponse<iIncome>>(environment.URL + `/api/users/income`, income).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iIncome>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('updateIncome');
      })
    );
  }

  public deleteIncome(income: iIncome): Observable<iResponse<iIncome>> {
    this.sharedService.queueLoading('deleteIncome');
    return this.http.delete<iResponse<iIncome>>(environment.URL + `/api/users/income/${income.id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iIncome>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('deleteIncome');
      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
    return null;
  }
}
