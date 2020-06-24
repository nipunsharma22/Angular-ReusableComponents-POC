import { Injectable } from "@angular/core";

import { Subject, Observable } from "rxjs";
import * as modalConfig from "../../assets/modal-text.json";

@Injectable({
    providedIn: "root"
})
export class ConfirmationDialogService {
    public sVal: boolean = false;
    public inputText: string = "";
    public testConnectionDetails: string = "";

    public subject = new Subject<any>();
    constructor() {}
    okCancelBasicConfirm(
        title: string,
        messageTitle: string,
        message: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        this.setOkCancelBasicConfirmation(
            title,
            messageTitle,
            message,
            btnOkText,
            btnCancelText,
            okFunc,
            cancelFunc
        );
    }
    setOkCancelBasicConfirmation(
        title: string,
        messageTitle: string,
        message: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        let that = this;
        this.subject.next({
            type: modalConfig.CONFIRM_TYPE_OK_CANCEL,
            title: title,
            messageTitle: messageTitle,
            message: message,
            btnOkText: btnOkText,
            btnCancelText: btnCancelText,
            okFunc: function() {
                that.subject.next(); //this will close the modal
                okFunc();
            },
            cancelFunc: function() {
                that.subject.next();
                cancelFunc();
            }
        });
    }

    switchBasicConfirm(
        title: string,
        messageTitle: string,
        switchbox: boolean,
        message: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        this.setSwitchBasicConfirmation(
            title,
            messageTitle,
            switchbox,
            message,
            btnOkText,
            btnCancelText,
            okFunc,
            cancelFunc
        );
    }
    setSwitchBasicConfirmation(
        title: string,
        messageTitle: string,
        switchbox: boolean,
        message: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        let that = this;
        this.subject.next({
            type: modalConfig.CONFIRM_TYPE_OK_CANCEL,
            title: title,
            messageTitle: messageTitle,
            switchbox: switchbox,
            message: message,
            btnOkText: btnOkText,
            btnCancelText: btnCancelText,
            okFunc: function () {
                that.subject.next(); //this will close the modal
                okFunc();
            },
            cancelFunc: function () {
                that.subject.next();
                cancelFunc();
            }
        });
    }
  saveRefreshCancelConfirm(
    title: string,
        message: string,
        btnSaveText: string = modalConfig.BUTTON_SAVE,
        btnRefreshText: string = modalConfig.BUTTON_REFRESH,
        btnCancelText: string = modalConfig.BUTTON_CANCEL,
        saveFunc: () => void,
        refreshFunc: () => void,
        cancelFunc: () => void
    ) {
    this.setSaveRefreshCancelConfirm(
          title,
            message,
            btnSaveText,
            btnRefreshText,
            btnCancelText,
            saveFunc,
            refreshFunc,
            cancelFunc
        );
    }
  setSaveRefreshCancelConfirm(
      title:string,
        message: string,
        btnSaveText: string = modalConfig.BUTTON_SAVE,
        btnRefreshText: string = modalConfig.BUTTON_REFRESH,
        btnCancelText: string = modalConfig.BUTTON_CANCEL,
        saveFunc: () => void,
        refreshFunc: () => void,
        cancelFunc: () => void
    ) {
        let that = this;
        this.subject.next({
          type: modalConfig.CONFIRM_TYPE_DUPLICATE_USER,
          title:title,
            message: message,
            btnSaveText: btnSaveText,
            btnRefreshText: btnRefreshText,
            btnCancelText: btnCancelText,
            saveFunc: function () {
                that.subject.next(); //this will close the modal
                saveFunc();
            },
            refreshFunc: function () {
                that.subject.next(); //this will close the modal
                refreshFunc();
            },
            cancelFunc: function () {
                that.subject.next();
                cancelFunc();
            }
        });
    }

    okCancelSmallConfirm(
        messageTitle: string,
        message: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        this.setOkCancelSmallConfirmation(
            messageTitle,
            message,
            btnOkText,
            btnCancelText,
            okFunc,
            cancelFunc
        );
    }
    setOkCancelSmallConfirmation(
        messageTitle: string,
        message: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        let that = this;
        this.subject.next({
            type: modalConfig.CONFIRM_TYPE_SIGN_OUT,
            messageTitle: messageTitle,
            message: message,
            btnOkText: btnOkText,
            btnCancelText: btnCancelText,
            okFunc: function () {
                that.subject.next(); //this will close the modal
                okFunc();
            },
            cancelFunc: function () {
                that.subject.next();
                cancelFunc();
            }
        });
    }

    okBasicConfirm(
        title: string,
        messageTitle: string,
        message: string,
        btnOkText: string,
        statusCode?: string
    ) {
        this.setokBasicConfirm(
            title,
            messageTitle,
            message,
            btnOkText,
            statusCode            
        );
    }
    setokBasicConfirm(
        title: string,
        messageTitle: string,
        message: string,
        btnOkText: string,
        statusCode?: string

    ) {
        this.subject.next({
            type: modalConfig.OK_CONFIRMATION,
            title: title,
            messageTitle: messageTitle,
            message: message,
            btnOkText: btnOkText,
            statusCode: statusCode
        });
    }


    okCancelTextInputConfirm(
        title: string,
        messageTitle: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        this.setOkCancelTextInputConfirmation(
            title,
            messageTitle,
            btnOkText,
            btnCancelText,
            okFunc,
            cancelFunc
        );
    }
    setOkCancelTextInputConfirmation(
        title: string,
        messageTitle: string,
        btnOkText: string,
        btnCancelText: string,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        let that = this;
        this.subject.next({
            type: modalConfig.COMFIRM_TYPE_ASK_TEXT_INPUT,
            title: title,
            messageTitle: messageTitle,
            btnOkText: btnOkText,
            btnCancelText: btnCancelText,
            okFunc: function () {
                that.subject.next(); //this will close the modal
                okFunc();
            },
            cancelFunc: function () {
                that.subject.next();
                cancelFunc();
            }
        });
    }

    // publish delete and cancel pop up.
    
    publishDeleteCancelBasicConfirm(
        title: string,
        messageTitle: string,
        message: string,
        btnPublishText: string,
        btnOkText: string,
        btnCancelText: string,
        publishFunc: () => void,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        this.setpublishDeleteCancelBasicConfirm(
            title,
            messageTitle,
            message,
            btnOkText,
            btnPublishText,
            btnCancelText,
            publishFunc,
            okFunc,
            cancelFunc
        );
    }
    setpublishDeleteCancelBasicConfirm(
        title: string,
        messageTitle: string,
        message: string,
        btnPublishText: string,
        btnOkText: string,
        btnCancelText: string,
        publishFunc: () => void,
        okFunc: () => void,
        cancelFunc: () => void
    ) {
        let that = this;
        this.subject.next({
            type: modalConfig.PUBLISH_DELETE_AND_CANCEL_CONFIRMATION,
            title: title,
            messageTitle: messageTitle,
            message: message,
            btnPublishText: btnPublishText,
            btnOkText: btnOkText,
            btnCancelText: btnCancelText,
            publishFunc: function () {
                that.subject.next(); 
                publishFunc();
            },
            okFunc: function () {
                that.subject.next(); //this will close the modal
                okFunc();
            },
            cancelFunc: function () {
                that.subject.next();
                cancelFunc();
            }
        });
    }



    clearMessage() {
        return this.subject.next();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    getsVal(sVal) {
        this.sVal = !this.sVal;
    }
}
