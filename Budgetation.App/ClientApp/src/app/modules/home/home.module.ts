import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { LoginBlockComponent } from './atoms/login-block/login-block.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [HomeComponent, LoginComponent, LoginBlockComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,

    MatCardModule,
    MatButtonModule
  ]
})
export class HomeModule { }
