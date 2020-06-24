import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
@Component({
  selector: "app-un-authorized-page",
  templateUrl: "./un-authorized-page.component.html",
  styleUrls: ["./un-authorized-page.component.scss"]
})
export class UnAuthorizedPageComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  backurl = () => {
    this.location.back();
  };
}
