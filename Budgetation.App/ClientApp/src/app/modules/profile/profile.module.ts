import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [ProfileComponent, SettingsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,

    MatChipsModule,
    MatCardModule,
    MatListModule,
  ]
})
// @ts-ignore
export class ProfileModule { }
