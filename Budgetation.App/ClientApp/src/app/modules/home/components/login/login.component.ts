import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  headerBlock = {blockTitle: "Login", blockSubtitle: "", blockContent: ""};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  login(): void {
    this.authService.login();
  }

}
