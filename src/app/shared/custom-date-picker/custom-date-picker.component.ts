import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

import { CustomDatePickerHeaderComponent } from "../custom-date-picker-header/custom-date-picker-header.component";

@Component({
  selector: "app-custom-date-picker",
  templateUrl: "./custom-date-picker.component.html",
  styleUrls: ["./custom-date-picker.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDatePickerComponent implements OnInit {
  customHeader: any;
  @Input()
  inputDate: Date;
  @Input()
  placeHolderText: string = "";
  @Input()
  date: any;
  serializedDate: any;
  constructor() {
    this.customHeader = CustomDatePickerHeaderComponent;
  }
  ngOnInit() {
    this.date = this.inputDate;
  }

  @Output() destinationdate: EventEmitter<any> = new EventEmitter<any>();

  change(dateEvent) {
    this.destinationdate.emit(dateEvent.value);
  }
}
