import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { Subscription, Observable, timer } from "rxjs";
import { AuthService, RefreshTokenService } from "src/app/services";
let moment = require("moment");
@Component({
  selector: "app-timer",
  templateUrl: "./app-timer.component.html",
  styleUrls: ["./app-timer.component.scss"]
})
export class AppTimerComponent implements OnInit {
  private refreshTimerSubscription: Subscription;
  private idleTimerSubscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() RefreshTokenSearchDate = moment();
  @Input() SearchDate = moment();
  @Input() RefreshTokenElapsTime: number = 3;
  @Input() ElapsTime: number = 3;
  RefreshTokensearchEndDate: any;
  searchEndDate: any;
  refreshTimerRemainingTime: number;
  refreshTimerMinutes: number;
  refreshTimerSeconds: number;
  refreshTimerEverySecond: Observable<number> = timer(0, 1000);
  idleTimerRemainingTime: number;
  idleTimerMinutes: number;
  idleTimerSeconds: number;
  idleTimerEverySecond: Observable<number> = timer(0, 1000);
  isTokenRefreshed: boolean = false;
  count: number = 0;
  constructor(
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService
  ) {
    this.isTokenRefreshed = false;
    this.RefreshTokenElapsTime =
      parseInt(this.authService.getTokenLifeTime()) * 4;
    this.ElapsTime = parseInt(this.authService.getTokenLifeTime()) * 4;
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");

    this.RefreshTokensearchEndDate = this.RefreshTokenSearchDate.add(
      this.RefreshTokenElapsTime,
      "minutes"
    );
  }

  ngOnInit() {
    //Refresh Token Timer
    this.refreshTimerSubscription = this.refreshTimerEverySecond.subscribe(
      seconds => {
        this.refreshTokenService
          .getRefreshTokenMessage()
          .subscribe(response => {
            if (response.isTokenRefreshed) {
           
              this.isTokenRefreshed = false;
              this.RefreshTokenSearchDate = moment();
              this.RefreshTokensearchEndDate = this.RefreshTokenSearchDate.add(
                this.RefreshTokenElapsTime,
                "minutes"
              );
              this.count = 0;
            }
          });
        var currentTime = moment();
        this.count = this.count + 1;
        this.refreshTimerRemainingTime = this.RefreshTokensearchEndDate.diff(
          currentTime
        );
        this.refreshTimerRemainingTime = this.refreshTimerRemainingTime / 1000;
        
        let tokenLifeTime = this.authService.getTokenLifeTime();
        if (
          this.refreshTimerRemainingTime / 60 <=
            parseFloat(tokenLifeTime) * 3.2 &&
          !this.isTokenRefreshed
        ) {
          this.isTokenRefreshed = true;
          this.refreshTokenService.tokenNeedToBeRefreshed();
        } else {
          this.refreshTimerMinutes = Math.floor(
            this.refreshTimerRemainingTime / 60
          );
          this.refreshTimerSeconds = Math.floor(
            this.refreshTimerRemainingTime - this.refreshTimerMinutes * 60
          );
        }
        this.ref.markForCheck();
      }
    );
    //Idle Time Time
    this.idleTimerSubscription = this.idleTimerEverySecond.subscribe(
      seconds => {
        this.refreshTokenService
          .getTimerRefreshMessage()
          .subscribe(response => {
            if (response.isTimerToBeRefreshed) {
              this.SearchDate = moment();
              this.searchEndDate = this.SearchDate.add(
                this.ElapsTime,
                "minutes"
              );
              this.count = 0;
            }
          });
        var currentTime = moment();
        this.count = this.count + 1;
        this.idleTimerRemainingTime = this.searchEndDate.diff(currentTime);
        this.idleTimerRemainingTime = this.idleTimerRemainingTime / 1000;
       
        let tokenLifeTime = this.authService.getTokenLifeTime();
        if (this.idleTimerRemainingTime / 60 <= parseFloat(tokenLifeTime)) {
          this.TimerExpired.emit();
        } else {
          this.idleTimerMinutes = Math.floor(this.idleTimerRemainingTime / 60);
          this.idleTimerSeconds = Math.floor(
            this.idleTimerRemainingTime - this.idleTimerMinutes * 60
          );
        }
        this.ref.markForCheck();
      }
    );
  }
  ngOnDestroy(): void {
    this.refreshTimerSubscription.unsubscribe();
    this.idleTimerSubscription.unsubscribe();
  }
}
