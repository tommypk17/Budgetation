import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navigationToggled: Subject<void> = new Subject<void>();


  constructor(private http: HttpClient) { }

  navigationToggle(): void {
    return this.navigationToggled.next();
  }

}
