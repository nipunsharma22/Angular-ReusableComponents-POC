import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  model: NgbDateStruct;
  timemodel: NgbTimeStruct;
  time = { hour: 13, minute: 30 };
  showTimePickerToggle: boolean = false;
  testdate: Date = new Date();
  constructor() { this.testdate.setDate(23); }
  ngOnInit(): void {
  }

  toggleDateTimeState($event) {

    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

}
