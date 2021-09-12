import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthenticatedComponent } from './components/unauthenticated/unauthenticated.component';
import {UnauthenticatedRoutingModule} from "./unauthenticated-routing.module";
import {SharedModule} from "../../shared/shared.module";




@NgModule({
  declarations: [
    UnauthenticatedComponent
  ],
  imports: [
    CommonModule,
    UnauthenticatedRoutingModule,
    SharedModule
  ]
})
export class UnauthenticatedModule { }
