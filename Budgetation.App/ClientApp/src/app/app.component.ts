import {Component, OnDestroy, OnInit} from '@angular/core';
import {MsalBroadcastService} from "@azure/msal-angular";
import {InteractionStatus} from "@azure/msal-browser";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AuthService} from "./services/auth.service";
import {iResponse} from "./models/response";
import {SharedService} from "./services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Budgetation';
  private readonly _destroying$ = new Subject<void>();

  constructor(private msalBroadcastService: MsalBroadcastService, private authService: AuthService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.authService.login().subscribe((res: iResponse<any>) => {
          if(res.success){

          }
        });
      })
  }

}
