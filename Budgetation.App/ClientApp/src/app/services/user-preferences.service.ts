import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Observable} from "rxjs";
import {iResponse} from "../models/response";
import {Income, SingleExpense} from "../models/financial";
import {environment} from "../../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";
import {UserPreference} from "../models/user";
import {KeyValue} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  public preferencesUpdated: EventEmitter<UserPreference> = new EventEmitter<UserPreference>();

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public initializeUserPreferences(): Promise<void> {
    return this.getUserPreferences().toPromise().then((res: iResponse<UserPreference[]>) => {
      if(res && res.data){
        sessionStorage.setItem('userPreferences', JSON.stringify(res.data));
      }
    });
  }

  public getPreference(key: string): UserPreference | null {
    let sessionPreferences: string = sessionStorage.getItem('userPreferences');
    if(!sessionPreferences){
      return null;
    }
    let preferences: UserPreference[] = [];
    try{
      preferences = JSON.parse(sessionPreferences);
    }catch{
      return null;
    }
    return preferences.find(x => x.key == key);
  }

  public setPreference(preference: UserPreference): void {
    this.updateUserPreference(preference).subscribe((res: iResponse<UserPreference[]>) => {
      if(res && res.data){
        sessionStorage.setItem('userPreferences', JSON.stringify(res.data));
      }
    });
  }

  public getUserPreferences(): Observable<iResponse<UserPreference[]>> {
    this.sharedService.queueLoading('getUserPreferences');
    return this.http.get<iResponse<UserPreference[]>>(environment.URL + '/api/userPreferences').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<UserPreference[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('getUserPreferences');
      })
    );
  }

  public updateUserPreference(preference: UserPreference): Observable<iResponse<UserPreference[]>> {
    this.sharedService.queueLoading('updateUserPreference');
    return this.http.put<iResponse<UserPreference[]>>(environment.URL + `/api/userPreferences/${preference.key}`, preference).pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<iResponse<UserPreference[]>>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {
        this.sharedService.dequeueLoading('updateUserPreference');
        this.preferencesUpdated.emit(preference);
      })
    );
  }

  public clearUserPreferences(): Promise<void> {
    return new Promise<void>(() => {
      sessionStorage.removeItem('userPreferences');
    });
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
    this.sharedService.clearLoading();
    return null;
  }
}
