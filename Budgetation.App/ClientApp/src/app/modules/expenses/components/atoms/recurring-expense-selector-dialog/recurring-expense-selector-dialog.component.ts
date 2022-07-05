import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {cReoccurrence, cReoccurrences, eReoccurrence, iBill} from "../../../../../models/financial";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-recurring-expense-selector-dialog',
  templateUrl: './recurring-expense-selector-dialog.component.html',
  styleUrls: ['./recurring-expense-selector-dialog.component.scss']
})
export class RecurringExpenseSelectorDialogComponent implements OnInit {

  @ViewChild('billSelectionList') billSelectionList: MatSelectionList;
  selected: iBill[] = [];
  reocurrences: cReoccurrences = new cReoccurrences();

  constructor(@Inject(MAT_DIALOG_DATA) public data: iBill[], public dialogRef: MatDialogRef<RecurringExpenseSelectorDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selectAll(): void{
    this.billSelectionList.selectAll()
  }

  deselectAll(): void{
    this.billSelectionList.deselectAll()
  }

  selectBills(): void {
    let bills: iBill[] = this.billSelectionList.selectedOptions.selected.map(x => x.value as iBill).filter(x => x != undefined);
    this.dialogRef.close(bills);
  }

  quickSelect(data: cReoccurrence): void {
    this.billSelectionList.options.forEach((v) => {
      if(v.value.reoccurrence == data.value){
        this.billSelectionList.selectedOptions.select(v);
      }else{
        this.billSelectionList.selectedOptions.deselect(v);
      }
    })
  }
}
