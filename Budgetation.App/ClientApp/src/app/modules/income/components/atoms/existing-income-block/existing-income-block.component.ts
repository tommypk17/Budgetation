import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {Income} from "../../../../../models/financial";
import {KeyValue} from "@angular/common";
import {SharedService} from "../../../../../services/shared.service";

@Component({
  selector: 'app-existing-income-block',
  templateUrl: './existing-income-block.component.html',
  styleUrls: ['./existing-income-block.component.scss']
})
export class ExistingIncomeBlockComponent implements OnInit {

  @Input('income') income: Income | undefined;
  @Output('save') save: Subject<Income> = new Subject<Income>();
  @Output('delete') delete: Subject<Income> = new Subject<Income>();

  edit: boolean = false;
  incomeTypes: KeyValue<number, string>[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.incomeTypes = this.sharedService.incomeTypes;
  }

  displayDate(inDate: Date): string {
    let date: Date;
    if(inDate != null) {
      let date: Date = new Date(inDate);
      return date.toLocaleDateString();
    }
  }

  displayIncomeType(type: number): string {
    let typeString: string | undefined = this.incomeTypes.find(x => x.key == type)?.value;
    return typeString? typeString: 'N/A';
  }

  displayMoney(amount: number): number{
    return this.sharedService.moneyRound(amount);
  }

  saveIncome(income: Income): void {
    this.save.next(income);
  }

  deleteIncome(income: Income): void {
    this.delete.next(income);
  }
}
