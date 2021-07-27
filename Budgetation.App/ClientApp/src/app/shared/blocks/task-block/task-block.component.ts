import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskDialogComponent} from '../../dialogs/new-task-dialog/new-task-dialog.component';
import {MoveTaskDialogComponent} from '../../dialogs/move-task-dialog/move-task-dialog.component';


@Component({
  selector: 'app-task-block',
  templateUrl: './task-block.component.html',
  styleUrls: ['./task-block.component.scss']
})
export class TaskBlockComponent implements OnInit {

  @Input('taskID') id: string;
  @Input('taskTitle') title: string;
  @Input('taskListId') taskListId: string;
  @Input('taskSubtitle') subtitle: string;
  @Input('taskContent') content: string;
  @Input('taskDone') done: boolean;
  @Input('taskDate') date: string;

  @Output() taskMarked = new EventEmitter<string>();
  @Output() taskDeleted = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  markDone(id: string){
    this.done = !this.done;
    this.taskMarked.emit(id);
  }

  deleteTask(id: string){
    this.taskDeleted.emit(id);
  }

  openMoveTaskDialog(id: string, taskListId: string) {
    const dialogRef = this.dialog.open(MoveTaskDialogComponent, {
      width: '350px',
      data: {taskId: id, oldTaskListId: taskListId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)
      }
    });

  }

}

export interface Task {
  id?: string;
  tasklist?: string;
  title: string;
  subtitle: string;
  content: string;
  done: boolean;
  date?: string;
}
