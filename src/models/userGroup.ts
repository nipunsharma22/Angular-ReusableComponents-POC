export class UserGroup {
    constructor(public type:string , public id: string, public name: string) { }
}

export interface IUserGroupResponse {
    total: number;
    results: UserGroup[];
}
