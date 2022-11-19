import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MsalBroadcastService} from "@azure/msal-angular";
import {EventMessage, EventType, InteractionStatus} from "@azure/msal-browser";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AuthService} from "./services/auth.service";
import {iResponse} from "./models/response";
import {SharedService} from "./services/shared.service";
import {Router} from "@angular/router";
import {UserPreferencesService} from "./services/user-preferences.service";
import {UserPreference} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Budgetation';
  private readonly _destroying$ = new Subject<void>();
  constructor(private sharedService: SharedService, private msalBroadcastService: MsalBroadcastService, private userPreferenceService: UserPreferencesService, private router: Router) {
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sharedService.changeScreenWidth(window.innerWidth);
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        this.userPreferenceService.initializeUserPreferences();
        let redirect = sessionStorage.getItem('afterLogin');
        if(redirect){
          sessionStorage.removeItem('afterLogin');
          this.router.navigate(redirect.split('/'));
        }
      });
  }

}
