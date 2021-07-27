import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {cProfile, iProfile} from '../../../../models/user';
import {iResponse} from "../../../../models/response";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  headerBlock = {blockTitle: "Budgetation - Profile", blockSubtitle: "", blockContent: ""};

  profile = new cProfile();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((res: iResponse<iProfile>) => {
      if(res.success){
        this.profile.firstName = res.data.firstName;
        this.profile.lastName = res.data.lastName;
        this.profile.email = res.data.email;
      }
    })
  }

  deleteAccount(){
    // this.authService.deleteAccount().subscribe((res: AuthService) => {
    //   console.log(res);
    // });
  }

}
