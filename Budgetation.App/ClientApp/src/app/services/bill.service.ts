import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ObservableInput, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {iBill} from "../models/financial";
import {catchError, finalize, retry} from "rxjs/operators";
import {SharedService} from "./shared.service";


@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllBills(): Observable<iBill[]> {
    this.sharedService.queueLoading('getAllBills');
    return this.http.get<iBill[]>(environment.URL + '/api/bills').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iBill[]>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getAllBills');
      })
    );
  }

  public saveBill(bill: iBill): Observable<iBill> {
    return this.http.post<iBill>(environment.URL + '/api/bills', bill).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iBill>((subscriber) => {
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
