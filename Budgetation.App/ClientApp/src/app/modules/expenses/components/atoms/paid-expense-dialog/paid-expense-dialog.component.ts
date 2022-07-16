import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-paid-expense-dialog',
  templateUrl: './paid-expense-dialog.component.html',
  styleUrls: ['./paid-expense-dialog.component.scss']
})
export class PaidExpenseDialogComponent implements OnInit {
  amount: number = this.data;
  constructor(public dialogRef: MatDialogRef<PaidExpenseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
  }

  ok(): void {
    this.dialogRef.close(this.amount);
  }

  close(): void{
    this.dialogRef.close(0);
  }

}
