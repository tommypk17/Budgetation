import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {iResponse} from "../models/response";
import {MsalService} from "@azure/msal-angular";
import {iProfile} from "../models/user";
import {AccountInfo} from "@azure/msal-browser";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private msalService: MsalService) { }

  login(): Observable<void> {
    return this.msalService.loginRedirect();
  }

  logout(): Observable<void> {
    return this.msalService.logout();
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      let account = this.msalService.instance.getAllAccounts()[0];
      if(account) subscriber.next(true);
      else subscriber.next(false);
    });
  }

  getProfile(): Observable<iResponse<iProfile>>{
    return new Observable((subscriber) => {
        let user: AccountInfo | undefined = this.msalService.instance.getAllAccounts()[0];
        let profile: iProfile = {email: '', firstName: '', lastName: ''};
        if(user){
          profile = {
            email: user.username,
            firstName: user.idTokenClaims['given_name'] as string,
            lastName: user.idTokenClaims['family_name'] as string
          };
          let res: iResponse<iProfile> = {
            success: 'success',
            message: 'user data found',
            data: profile
          };
          subscriber.next(res);
        }else{
          let res: iResponse<iProfile> = {
            success: 'error',
            message: 'user data not found',
            data: undefined
          };
          subscriber.next(res);
        }
      });
    }

}
