export class Menu {
  DisplayName: string;
  Url: string;
  IsNavigationMenuItem: boolean;
  IsDashboardItem: boolean;
  IsStandAlonePage: boolean;
  Category: string;
  Svg: string;
  Order: number;
  IsAuthorized: boolean;
  constructor(
    displayName: string,
    url: string,
    isNavigationMenuItem: boolean,
    isDashboardItem: boolean,
    category: string,
    svg: string,
    isStandAlonePage: boolean,
    order: number,
    isAuthorised: boolean = false
  ) {
    this.DisplayName = displayName;
    this.Url = url;
    this.IsDashboardItem = isDashboardItem;
    this.IsNavigationMenuItem = isNavigationMenuItem;
    this.Category = category;
    this.Svg = svg;
    this.IsStandAlonePage = isStandAlonePage;
    this.Order = order;
    this.IsAuthorized = isAuthorised;
  }
}
