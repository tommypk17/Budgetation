import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

  toggleNavigation(): void {
    this.sharedService.navigationToggle();
  }

  logout(): void {
    this.authService.logout();
  }

}

