import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-list-dialog',
  templateUrl: './new-task-list-dialog.component.html',
  styleUrls: ['./new-task-list-dialog.component.scss']
})
export class NewTaskListDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<NewTaskListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
interface DialogData {
  title: string;
  subtitle: string;
  content: string;
}
