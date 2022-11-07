import { Component, OnInit } from '@angular/core';
import {UserPreferencesService} from "../../../../services/user-preferences.service";
import {UserPreference} from "../../../../models/user";
import {KeyValue} from "@angular/common";
import {iResponse} from "../../../../models/response";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  headerBlock = {blockTitle: "Budgetation - Profile - Settings", blockSubtitle: "", blockContent: ""};

  constructor(private userPreferences: UserPreferencesService) { }

  ngOnInit(): void {
    this.userPreferences.getUserPreferences().subscribe((res:iResponse<KeyValue<string, any>[]>) => {
      console.log(res);
    })
  }

}
