import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {
  AuthService,
  UserService,
  NotificationService,
  RefreshTokenService
} from "../services";
import { Router, ActivatedRoute } from "@angular/router";
import * as appConfig from "../../assets/app-text.json";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  isLoading: boolean;
  loginTitles: any;
  errorMessage = "";
  isSessionTimeExpired: boolean = false;
  @ViewChild("username", { static: true }) activeUserName: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginTitles = appConfig;
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.isLoading = false;
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.isSessionTimeExpired = this.route.snapshot.queryParams[
      "sessionTimeOut"
    ]
      ? parseInt(this.route.snapshot.queryParams["sessionTimeOut"]) == 1
      : false;
    this.activeUserName.nativeElement.focus();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  clearUser(){
    this.f.username.reset();
  }
  clearPassword()
  {
    this.f.password.reset();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.removeCookies();
    if (!this.authService.isAuthenticated) {
      this.isLoading = true;
      this.authService
        .getAuthorizationToken(this.f.username.value, this.f.password.value)
        .subscribe(
          tokenData => {
            this.authService.setAccessToken(tokenData);
            this.isLoading = false;
            this.router.navigate(['dashboard']);

            this.userService.getCurrentUser().subscribe(
              userData => {
                
                this.userService.setUser(userData, tokenData);
                this.isLoading = false;
                this.notificationService.success(
                  appConfig.LOGIN_SUCCESSFUL_MESSAGE.replace(
                    "{0}",
                    userData.user[0].userName
                  )
                );
                this.isSessionTimeExpired = false;
                //this.router.navigate([this.returnUrl]);
              },
              error => {
                this.isLoading = false;
                this.notificationService.error(appConfig.USER_NOT_FOUND);
              }
            );
          },
          error => {
            this.errorMessage = appConfig.LOGIN_VALIDATION_MESSAGE;
            this.isLoading = false;
          }
        );
    }
  }
}
