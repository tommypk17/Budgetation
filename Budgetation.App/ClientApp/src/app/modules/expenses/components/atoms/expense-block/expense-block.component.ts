import {Component, OnInit, ViewChild} from '@angular/core';
import {cBill, cExpenseTypes, cReoccurrences, eReoccurrence, iBill} from "../../../../../models/financial";
import {cFieldValidationMessage, eValidationType} from "../../../../../models/validation";
import {MatSelect} from "@angular/material/select";


@Component({
  selector: 'app-expense-block',
  templateUrl: './expense-block.component.html',
  styleUrls: ['./expense-block.component.scss']
})
export class ExpenseBlockComponent implements OnInit {

  bill: iBill = new cBill();

  @ViewChild('reoccurrence') reoccurrence: MatSelect;

  expenseTypes: cExpenseTypes = new cExpenseTypes();
  reoccurrences: cReoccurrences = new cReoccurrences();

  isErroneous: boolean = false;
  errors: cFieldValidationMessage[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  public onSave(): void {
    if(this.bill.validation.isObjectValid()){
     //TODO: save to DB.
      console.log('save', this.bill);
    }else{
      //TODO: toast, cannot save - not valid
      console.log('not valid');
    }
  }

  public onChange(fieldName: any, fieldValue: any): void {


    //which field changed?
    let changeIdx = this.bill.validation.validationFields.findIndex(x => x.fieldName == fieldName);

    //in the case of reoccurrence, we need to alter validationFields for begin field
    if(this.reoccurrence.value > 0){
      let beginIdx = this.bill.validation.validationFields.findIndex(x => x.fieldName == 'begin');
      let vIdx = this.bill.validation.validationFields[beginIdx].validationTypes.findIndex(x => x == eValidationType.isNotRequired);
      this.bill.validation.validationFields[beginIdx].validationTypes.splice(vIdx, 1);
    }else if (this.reoccurrence.value == 0){
      let beginIdx = this.bill.validation.validationFields.findIndex(x => x.fieldName == 'begin');
      this.bill.validation.validationFields[beginIdx].validationTypes.push(eValidationType.isNotRequired);
    }
    //update validator to inform of field changes so validation can take place with recent data change
    this.bill.validation.validationFields[changeIdx].fieldValue = fieldValue;


    //perform check on validator, change object state if invalid
    this.isErroneous = !this.bill.validation.isObjectValid()
    this.errors = this.bill.validation.invalidObjectFields();
  }

  validate(){
  }

  clearReoccur(reoccurrence: eReoccurrence){
    if(reoccurrence == eReoccurrence.Single) {
      this.bill.begin = null;
    }
  }

}
