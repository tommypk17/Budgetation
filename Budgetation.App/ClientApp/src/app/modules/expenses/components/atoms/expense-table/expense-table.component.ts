import {Component, Input, OnInit} from '@angular/core';
import {AbstractExpense} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {

  @Input('expenses') expenses: AbstractExpense[];
  displayedColumns: string[] = ['name', 'amount', 'type', 'paidOn', 'due', 'reoccurs']

  expenseTypes: KeyValue<number, string>[] = [];
  reoccurrences: KeyValue<number, string>[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.expenseTypes = this.sharedService.expenseTypes;
    this.reoccurrences = this.sharedService.reoccurrences;
  }

  displayExpenseType(type: number): string {
    let typeString: string | undefined = this.expenseTypes.find(x => x.key == type)?.value;
    return typeString? typeString: 'N/A';
  }

  displayReoccurrenceType(type: number | undefined): string {
    if(type == undefined) return 'No';
    let typeString: string | undefined = this.reoccurrences.find(x => x.key == type)?.value;
    return typeString? typeString: 'No';
  }

}
