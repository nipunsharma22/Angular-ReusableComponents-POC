import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent {
  @Input()
  public loading: boolean;
  // @Input()
  // public loadingpopup: boolean;
  @Input()
  public folderPopuploading: boolean;
  @Input()
  public folderloading: boolean;
  @Input()
  public clientfolderloading: boolean;
  @Input()
  public clientfoldertemp: boolean;

  constructor() {}
}
