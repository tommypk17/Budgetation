import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ObservableInput, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {iBill} from "../models/financial";
import {catchError, finalize, retry} from "rxjs/operators";
import {SharedService} from "./shared.service";
import {iResponse} from "../models/response";


@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllBills(): Observable<iResponse<iBill[]>> {
    this.sharedService.queueLoading('getAllBills');
    return this.http.get<iResponse<iBill[]>>(environment.URL + '/api/bills').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iBill[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllBills');
      })
    );
  }

  public saveBill(bill: iBill): Observable<iResponse<iBill>> {
    return this.http.post<iResponse<iBill>>(environment.URL + '/api/bills', bill).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iBill>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  public updateBill(bill: iBill): Observable<iResponse<iBill>> {
    return this.http.put<iResponse<iBill>>(environment.URL + `/api/bills/${bill.id}`, bill).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<iBill>>((subscriber) => {
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
