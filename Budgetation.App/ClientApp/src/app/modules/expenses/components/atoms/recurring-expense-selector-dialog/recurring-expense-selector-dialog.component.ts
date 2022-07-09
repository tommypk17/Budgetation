import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {KeyValue} from "@angular/common";
import {AbstractExpense, eIncomeType, eReoccurrence} from "../../../../../models/financial";

@Component({
  selector: 'app-recurring-expense-selector-dialog',
  templateUrl: './recurring-expense-selector-dialog.component.html',
  styleUrls: ['./recurring-expense-selector-dialog.component.scss']
})
export class RecurringExpenseSelectorDialogComponent implements OnInit {

  @ViewChild('expenseSelectionList') expenseSelectionList: MatSelectionList;
  selected: AbstractExpense[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AbstractExpense[], public dialogRef: MatDialogRef<RecurringExpenseSelectorDialogComponent>) { }

  ngOnInit(): void {
    Object.keys(eReoccurrence).forEach((v) => {
      this.reoccurrences.push({key: eIncomeType[v], value: v});
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selectAll(): void{
    this.expenseSelectionList.selectAll()
  }

  deselectAll(): void{
    this.expenseSelectionList.deselectAll()
  }

  selectBills(): void {
    let bills: AbstractExpense[] = this.expenseSelectionList.selectedOptions.selected.map(x => x.value as AbstractExpense).filter(x => x != undefined);
    this.dialogRef.close(bills);
  }

  quickSelect(data: KeyValue<number, string>): void {
    this.expenseSelectionList.options.forEach((v) => {
      if(v.value.reoccurrence == data.value){
        this.expenseSelectionList.selectedOptions.select(v);
      }else{
        this.expenseSelectionList.selectedOptions.deselect(v);
      }
    })
  }
}
