import { SCREEN_SIZE } from "src/app/enums/screen-size.enum";

export class WindowSize {
  static sizes = [
    {
      id: SCREEN_SIZE.XS,
      name: "xs",
      maxWidth: 767
    },
    {
      id: SCREEN_SIZE.SM,
      name: "sm",
      minWidth: 768,
      maxWidth: 991
    },
    {
      id: SCREEN_SIZE.MD,
      name: "md",
      minWidth: 992,
      maxWidth: 1199
    },
    {
      id: SCREEN_SIZE.LG,
      name: "lg",
      minWidth: 1200
    }
  ];
}
