import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderBlockComponent } from './blocks/header-block/header-block.component';

//angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import { CallbackPipe } from './pipes/callback.pipe';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {MatCardModule} from "@angular/material/card";
import { MatMonthPickerComponent } from './input/mat-month-picker/mat-month-picker.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    ToolbarComponent,
    CallbackPipe,
    SidenavComponent,
    ProgressBarComponent,
    HeaderBlockComponent,
    MatMonthPickerComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    RouterModule,
    MatListModule,
    FormsModule,
    MatProgressBarModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,

  ],
  exports: [
    ToolbarComponent,
    HeaderBlockComponent,
    SidenavComponent,
    CallbackPipe,
    ProgressBarComponent,
    MatMonthPickerComponent
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule { }
