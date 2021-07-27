import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {iResponse} from "../models/response";
import {MsalService} from "@azure/msal-angular";
import {iProfile} from "../models/user";


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
    return this.http.get<iResponse<iProfile>>(environment.URL + '/api/auth/profile');
  }

}
