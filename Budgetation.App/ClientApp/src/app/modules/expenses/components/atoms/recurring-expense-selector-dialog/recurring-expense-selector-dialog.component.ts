import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {KeyValue} from "@angular/common";
import {AbstractExpense, eIncomeType, eReoccurrence, RecurringExpense} from "../../../../../models/financial";
import {SharedService} from "../../../../../services/shared.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-recurring-expense-selector-dialog',
  templateUrl: './recurring-expense-selector-dialog.component.html',
  styleUrls: ['./recurring-expense-selector-dialog.component.scss']
})
export class RecurringExpenseSelectorDialogComponent implements OnInit {

  @ViewChild('expenseSelectionList') expenseSelectionList: MatSelectionList;
  selected: RecurringExpense[] = [];
  reoccurrences: KeyValue<number, string>[] = [];


  constructor(private sharedService:SharedService, @Inject(MAT_DIALOG_DATA) public data: RecurringExpense[], public dialogRef: MatDialogRef<RecurringExpenseSelectorDialogComponent>) { }

  ngOnInit(): void {
    this.reoccurrences = this.sharedService.reoccurrences;
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
    let bills: RecurringExpense[] = this.expenseSelectionList.selectedOptions.selected.map(x => x.value as RecurringExpense).filter(x => x != undefined);
    this.dialogRef.close(bills);
  }

  quickSelect(data: MatSelectChange): void {
    this.expenseSelectionList.options.forEach((v) => {
      if(v.value.interval == data.value){
        this.expenseSelectionList.selectedOptions.select(v);
      }else{
        this.expenseSelectionList.selectedOptions.deselect(v);
      }
    })
  }

  displayReoccurrenceType(type: number | undefined): string {
    if(type == undefined) return 'No';
    let typeString: string | undefined = this.reoccurrences.find(x => x.key == type)?.value;
    return typeString? typeString: 'No';
  }
}
