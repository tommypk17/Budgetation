import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {filter, takeUntil} from "rxjs/operators";
import {InteractionStatus} from "@azure/msal-browser";
import {Subject} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  isUserLoggedIn: boolean = false;

  displayMenu: boolean = window.innerWidth <= 996;

  constructor(private msalBroadcastService: MsalBroadcastService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.authService.isLoggedIn().subscribe((res) => {
          this.isUserLoggedIn = res;
        });
      })

    this.sharedService.screenWidth.subscribe((size: number) => {
      this.displayMenu = size <= 996;
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next();
  }

  toggleNavigation(): void {
    this.sharedService.navigationToggle();
  }

  logout(): void {
    this.router.navigate(['']).then(() => {this.authService.logout()});
  }

  login(): void {
    this.authService.login();
  }

}

