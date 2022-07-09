import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {iResponse} from "../models/response";
import {Income} from "../models/financial";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllIncome(): Observable<iResponse<Income[]>> {
    this.sharedService.queueLoading('getAllIncome');
    return this.http.get<iResponse<Income[]>>(environment.URL + '/api/users/income').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Income[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllIncome');
      })
    );
  }

  public saveIncome(income: Income): Observable<iResponse<Income>> {
    this.sharedService.queueLoading('saveIncome');
    return this.http.post<iResponse<Income>>(environment.URL + '/api/users/income', income).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Income>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('saveIncome');
      })
    );
  }

  public updateIncome(income: Income): Observable<iResponse<Income>> {
    this.sharedService.queueLoading('updateIncome');
    return this.http.put<iResponse<Income>>(environment.URL + `/api/users/income`, income).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Income>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('updateIncome');
      })
    );
  }

  public deleteIncome(income: Income): Observable<iResponse<Income>> {
    this.sharedService.queueLoading('deleteIncome');
    return this.http.delete<iResponse<Income>>(environment.URL + `/api/users/income/${income.id}`).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<Income>>((subscriber) => {
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
