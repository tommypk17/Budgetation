import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MsalBroadcastService} from "@azure/msal-angular";
import {InteractionStatus} from "@azure/msal-browser";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AuthService} from "./services/auth.service";
import {iResponse} from "./models/response";
import {SharedService} from "./services/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Budgetation';
  private readonly _destroying$ = new Subject<void>();
  constructor(private sharedService: SharedService) {
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sharedService.changeScreenWidth(window.innerWidth);
  }

  ngOnInit(): void {
  }

}
