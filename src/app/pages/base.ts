
import { Injectable } from '@angular/core';
import { LoadingViewService,LocaleService,CommonService } from '../providers';
import { AlertController } from 'ionic-angular';

import {AppInjector} from '../app-injector';
import { Events } from 'ionic-angular';

@Injectable()
export class BasePage {
  private loaderView: LoadingViewService;
  private commonAlertCtrl: AlertController;
  private locale:LocaleService;
  public commonService:CommonService;
  private commonEvents: Events
  constructor() {
    this.loaderView = AppInjector.get(LoadingViewService);
    this.commonAlertCtrl = AppInjector.get(AlertController);
    this.locale = AppInjector.get(LocaleService);
    this.commonService = AppInjector.get(CommonService);
    this.commonEvents = AppInjector.get(Events);
  }
//#region "Loader code"

  showLoaderWithMessage(message :string){
    this.loaderView.showLoadingPopup(message)
  }

  setDefaultLoadingMessage(message: string){
    this.loaderView.defaultLoadingMessage = message;
  }

  getDefaultLoadingMessage():string{
    return this.loaderView.defaultLoadingMessage;
  }

  showLoader(){
    this.loaderView.showLoadingPopup();
  }

  dismissLoader(){
    setTimeout(() => {
        this.loaderView.dismissLoadingPopup();
    }, 1700);
  }

  isShowingLoader():boolean{
    return this.loaderView.isLoaderShowing;
  }
//#endregion "Loader code"

//#region "Alert popup code"
    /**
    * Help to show alerts
    * 
    * @param {string} text 
    * @memberof BasePage
    */
   showWaring(message: string,title?: string) {
    this.dismissLoader();
    
    let alert = this.commonAlertCtrl.create({
      title: title || this.getLocale("APP_NAME"),
      message: message,
      cssClass:'waring-alter-button',
      buttons: ['OK']
    });
    alert.present();
    
  }

  showError(message: string,title?: string) {
    this.dismissLoader();
    
    let alert = this.commonAlertCtrl.create({
      title: title || this.getLocale("APP_NAME"),
      message: message,
      cssClass:'error-alter-button',
      buttons: ['OK']
    });
    alert.present();

  }

  showOkAlert( message, yesHandler, caller?, title?) {
    this.dismissLoader();
    let alert = this.commonAlertCtrl.create({
        title: title || this.getLocale("APP_NAME"),
        message: message,
        cssClass:'ok-cancel-alter-buttons',
        buttons: [
            {
                text: 'OK',
                handler: () => yesHandler(caller)
            }
        ]
    });
    alert.present();
}

  showAlert( message, yesHandler, caller?, title?, noHandler? ) {
    this.dismissLoader();
    let alert = this.commonAlertCtrl.create({
        title: title || "Please Confirm",
        message: message,
        cssClass:'ok-cancel-alter-buttons',
        buttons: [
            {
                text: 'OK',
                handler: () => yesHandler(caller)
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => { if(noHandler)noHandler(caller);}
            }
        ]
    });
    alert.present();
}

//#endregion "Alert popup code"

//#region "Loader code"
  getLocale(label?: string):string{
    return this.locale.get(label);
  }

  getLocaleFormatStringFunction(label?: string):Function{
    return this.locale.getFormatStringFunction(label);
  }

//#endregion "Loader code"

requestHandleError(error:any){
  if (error.status === 401) {
    this.commonService.currentUser = null;
    this.commonEvents.publish('user::logout');
  }
}

}
