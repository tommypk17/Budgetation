import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  headerBlock = {blockTitle: "Budgetation - Profile - Settings", blockSubtitle: "", blockContent: ""};

  constructor() { }

  ngOnInit(): void {
  }

}
