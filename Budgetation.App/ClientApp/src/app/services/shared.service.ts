import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navigationToggled: Subject<void> = new Subject<void>();
  loading: Subject<boolean> = new Subject<boolean>();
  loadingQueue: string[] = [];

  constructor(private http: HttpClient) { }

  navigationToggle(): void {
    return this.navigationToggled.next();
  }

  queueLoading(section: string): void {
    let foundIdx = this.loadingQueue.findIndex(x => x == section);
    if(foundIdx < 0){
      this.loadingQueue.push(section);
    }
    if(this.loadingQueue.length > 0){
      this.loading.next(true);
    }
  }

  dequeueLoading(section: string): void {
    let foundIdx = this.loadingQueue.findIndex(x => x == section);
    if(foundIdx >= 0) {
      this.loadingQueue.splice(foundIdx, 1);
    }
    if(this.loadingQueue.length <= 0){
      this.loading.next(false);
    }
  }

  clearLoading(): void {
    this.loadingQueue = [];
    this.loading.next(false);
  }

}
