import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from "src/app/services";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
  }

  dialog() {
    this.confirmationDialogService.okCancelBasicConfirm(
      "title of the action ",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "",
      "Confirm",
      "Cancel",
      () => {

      },
      () => { }
    );
  }

}
