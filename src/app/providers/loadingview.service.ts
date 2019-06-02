import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingViewService {
    private loading: Loading;
    isLoaderShowing: boolean;
    defaultLoadingMessage: string = 'Please wait...';
    constructor(public loadingCtrl: LoadingController) {

    }

    showLoadingPopup(message?: string) {
        if (this.isLoaderShowing) {
            this.loading.dismiss();
        }

        this.loading = this.loadingCtrl.create({
            content: message || this.defaultLoadingMessage,
            dismissOnPageChange: true
        });
        this.loading.present();
        this.isLoaderShowing = true;
    }

    dismissLoadingPopup() {
        try {
            if (this.loading) {
                this.loading.dismiss();
                this.loading = null;
            }
            this.isLoaderShowing = false;
        } catch(ex){

        }
    }



}