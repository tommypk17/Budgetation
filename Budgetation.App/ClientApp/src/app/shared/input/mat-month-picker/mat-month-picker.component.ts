import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {Moment} from "moment";

export const MonthPickerFormat = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'mat-month-picker',
  templateUrl: './mat-month-picker.component.html',
  styleUrls: ['./mat-month-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MonthPickerFormat},
  ],
})
export class MatMonthPickerComponent {
  @Output('dateChanged') dateChanged: EventEmitter<Date> = new EventEmitter<Date>();
  date: Moment;

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.date = normalizedMonthAndYear;
    datepicker.close();
    this.dateChanged.next(this.date.toDate())
  }


}
