import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnDestroy
} from "@angular/core";
import { Subject } from "rxjs";
import {
  MatCalendar,
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS
} from "@angular/material";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "custom-header",
  templateUrl: "./custom-date-picker-header.component.html",
  styleUrls: ["./custom-date-picker-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDatePickerHeaderComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();
  date: any;
  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
      cdr.markForCheck();
    });
    this.date = new Date();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter.format(
      this._calendar.activeDate,
      this._dateFormats.display.monthYearA11yLabel
    );
  }
  get yearLabel() {
    return this._dateAdapter.getYear(this._calendar.activeDate);
  }
  get dateLabel() {
    return (
      this._dateAdapter.getDayOfWeekNames("short")[
        this._dateAdapter.getDayOfWeek(this._calendar.activeDate)
      ] +
      ", " +
      this._dateAdapter.getMonthNames("short")[
        this._dateAdapter.getMonth(this._calendar.activeDate)
      ] +
      " " +
      this._dateAdapter.getDate(this._calendar.activeDate)
    );
  }
  previousClicked(mode: "month" | "year") {
    this._calendar.activeDate =
      mode === "month"
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: "month" | "year") {
    this._calendar.activeDate =
      mode === "month"
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
