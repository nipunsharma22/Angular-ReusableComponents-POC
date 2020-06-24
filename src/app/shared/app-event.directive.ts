import { Directive, HostListener, OnInit } from "@angular/core";
import { RefreshTokenService, AuthService } from "../services";

@Directive({
  selector: "[appevent]"
})
export class AppEventDirective implements OnInit {
  isTokenToBeRefreshed: boolean = false;
  constructor(
    private refreshTokenservice: RefreshTokenService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isTokenToBeRefreshed = false;
    this.refreshTokenservice.getRefreshTokenMessage().subscribe(response => {
      if (response.isTokenToBeRefreshed) {
        this.refreshTokenservice.refreshToken();
        this.isTokenToBeRefreshed = this.isTokenToBeRefreshed ? true : false;
      }
      if (response.isTokenRefreshed) {
        this.isTokenToBeRefreshed = false;
      }
    });
  }
 
  @HostListener("document:click", ["$event"])
  
  customEventHandler(event) {
    this.isTokenToBeRefreshed = this.isTokenToBeRefreshed ? true : false;

    this.refreshTokenservice.timerRefresh();
  }
}
