import {Component, Inject, Output, EventEmitter, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskList} from '../../shared.module';

@Component({
  selector: 'app-move-task-dialog',
  templateUrl: './move-task-dialog.component.html',
  styleUrls: ['./move-task-dialog.component.scss']
})
export class MoveTaskDialogComponent implements OnInit{

  taskLists: TaskList[] = [];

  constructor(
    public dialogRef: MatDialogRef<MoveTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.taskLists.push({id: '1', title: 'title1'})
    this.taskLists.push({id: '1', title: 'title1'})
    this.taskLists.push({id: '1', title: 'title1'})
    this.taskLists.push({id: '1', title: 'title1'})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectTaskList(id: string){
    const result = {oldTaskListId:'', newTaskListId: id, taskId:this.data.taskId}
    this.dialogRef.close();
  }


}
interface DialogData {
  taskId: string
}
