import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NewTaskListDialogComponent} from '../../dialogs/new-task-list-dialog/new-task-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskDialogComponent} from '../../dialogs/new-task-dialog/new-task-dialog.component';
import {Task, TaskList} from '../../shared.module';

@Component({
  selector: 'app-header-block',
  templateUrl: './header-block.component.html',
  styleUrls: ['./header-block.component.scss']
})
export class HeaderBlockComponent implements OnInit {

  @Input('blockTitle') title: string;
  @Input('blockSubtitle') subtitle: string;
  @Input('blockContent') content: string;
  @Input('blockBackLink') backLink: string;
  @Input('blockAddLink') addLink: string;

  @Output() newTaskEvent = new EventEmitter<Task>();
  public newTask: Task;

  @Output() newTaskListEvent = new EventEmitter<TaskList>();
  public newTaskList: TaskList;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.newTask = result;
      this.newTaskEvent.emit(this.newTask);
    });
  }

  openNewTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.newTaskList = result;
      this.newTaskListEvent.emit(this.newTaskList);
    });
  }

}
