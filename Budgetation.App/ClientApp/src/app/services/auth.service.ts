import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {iResponse} from "../models/response";
import {MsalService} from "@azure/msal-angular";
import {iProfile} from "../models/user";
import {AccountInfo} from "@azure/msal-browser";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private msalService: MsalService) { }

  login(): Observable<iResponse<any>> {
    return this.http.get<iResponse<any>>(environment.URL + '/api/auth/login');
  }

  logout(): void{
    this.msalService.logout();
  }

  getProfile(): Observable<iResponse<iProfile>>{
    return new Observable((subscriber) => {
        let user: AccountInfo | undefined = this.msalService.instance.getAllAccounts()[0];
        let profile: iProfile;
        if(user){
          profile = {
            email: user.username,
            firstName: user.idTokenClaims['given_name'],
            lastName: user.idTokenClaims['family_name']
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
