import { Component, OnInit } from "@angular/core";

import { ConfirmationDialogService, AuthService } from "src/app/services";
import {
  trigger,
  transition,
  animate,
  style,
  state
} from "@angular/animations";
import * as modalData from "../../../assets/modal-text.json";
import * as appData from "../../../assets/app-text.json";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      //fade in when created. this could also be written as transition('void => *')
      transition(":enter", [
        style({ transform: "translateY(-50%)", opacity: 0 }),
        animate(100)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(
        ":leave",
        animate(200, style({ transform: "translateY(0%)", opacity: 0 }))
      )
    ])
  ]
})
export class ConfirmationDialogComponent implements OnInit {
  message: any;
  statusCode: any;
  public sVal: boolean = false;
  public modalConstant: any;
  public appConstant: any;
  constructor(
    public confirmDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this function waits for a message from alert service, it gets
    //triggered when we call this from any other component
    this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
    this.modalConstant = modalData["default"];
    this.appConstant = appData["default"];
  }
  close() {
    this.confirmDialogService.clearMessage();
  }

  onOkClick(statusCode: any) {
    if (statusCode == 401) {
      this.authService.removeCookies();
      let returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
      if (returnUrl == "/") {
        this.router.navigate(["/login"], {
          queryParams: {
            returnUrl: this.router.url
          }
        });
      } else {
        this.router.navigate(["/login"], {
          queryParams: {
            returnUrl: returnUrl
          }
        });
      }
    } else {
    }
    this.confirmDialogService.clearMessage();
  }

  testConnectionDetailsPrompt() {
    this.close();
    console.log("Details Link Clicked!!");
  }
}
