import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderBlockComponent } from './blocks/header-block/header-block.component';
import {TaskBlockComponent} from './blocks/task-block/task-block.component';

//angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { ListBlockComponent } from './blocks/list-block/list-block.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { NewTaskListDialogComponent } from './dialogs/new-task-list-dialog/new-task-list-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { NewTaskDialogComponent } from './dialogs/new-task-dialog/new-task-dialog.component';
import { CallbackPipe } from './pipes/callback.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { MoveTaskDialogComponent } from './dialogs/move-task-dialog/move-task-dialog.component';
import {MatTreeModule} from '@angular/material/tree';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


export {Task} from './blocks/task-block/task-block.component';
export {TaskList} from './blocks/list-block/list-block.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    TaskBlockComponent,
    HeaderBlockComponent,
    ListBlockComponent,
    NewTaskListDialogComponent,
    NewTaskDialogComponent,
    CallbackPipe,
    MoveTaskDialogComponent,
    SidenavComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTreeModule,
    MatProgressBarModule
  ],
  exports: [
    ToolbarComponent,
    TaskBlockComponent,
    HeaderBlockComponent,
    ListBlockComponent,
    SidenavComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    CallbackPipe,
    MatProgressBarModule,
    ProgressBarComponent
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule { }
