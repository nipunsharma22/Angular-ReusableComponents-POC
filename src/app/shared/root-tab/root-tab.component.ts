import { Component, Input } from "@angular/core";

@Component({
  selector: "root-app-tab",
  templateUrl: "./root-tab.component.html",
  styleUrls: ["./root-tab.component.scss"]
})
export class RootTabComponent {
  @Input("tabTitle") title: string;
  @Input("tabImgUrl") imageUrl: string;
  @Input("tabImgClass") imageClass: string;
  @Input() active = false;
}
