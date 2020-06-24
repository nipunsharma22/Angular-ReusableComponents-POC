export class PageModel {
  constructor(
    public pageName: string,
    public pageId: string,
    public noSelectionText: string,
    public leftPaneHeaderIcon: string,
    public isSearchOn: boolean,
    public leftPaneButtons: LeftPaneButtons,
    public leftPaneHeaderRightIcon?: string,
    public leftPaneClass?: string,
    public rightPaneClass?: string,
    public leftPaneData?: any,
    public addFormFieldSet?: AddFormFieldSet[],
      public filterOption?: ItemOptions[]
   
  ) {}
}
export class LeftPaneButtons {
  constructor(
    public contextMenu?: boolean,
    public displayName?: boolean,
    public description?: boolean,
    public btnPublish?: boolean,
    public btnEdit?: boolean,
    public btnTestConnection?: boolean,
    public btnDelete?: boolean,
    public btnCachedoc?: boolean,
    public taskType?: boolean,
    public taskLastRun?: boolean,
    public schedule?: boolean,
    public viewRunBtn?: boolean,
    public startTime?: boolean,
    public endTime?: boolean,
    public taskRunStatus?: boolean,
    public summary?: boolean,
    public lastExport?: boolean,
    public docnum?: boolean,
    public version?: boolean,
    public name?: boolean,
    public edit_profile_date?: boolean,
    public file_create_date?: boolean,
    public file_edit_date?: boolean,
      public lastVerify?: boolean,
      public singleAddFormField?: boolean
     
  ) {}
}

export class AddFormFieldSet {
  constructor(
    public label: string,
    public type: string,
    public defaultValue?: string,
    public options?: ItemOptions
  ) {}
}
export class ItemOptions {
  constructor(public option: string, public value: string) {}
}
