import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {SharedService} from "../services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class PreviousPageGuard implements CanDeactivate<any> {
  constructor(private sharedService: SharedService) {
  }
  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.sharedService.previousRoute = currentState.url;
    return true;
  }

}
