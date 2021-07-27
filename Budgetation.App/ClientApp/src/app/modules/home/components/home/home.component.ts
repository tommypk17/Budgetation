import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headerBlock = {blockTitle: "Dashboard", blockSubtitle: "", blockContent: ""};

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.test().subscribe((res) => {
      console.log(res);
    })
  }

}
