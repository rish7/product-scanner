import { Component , ViewChild} from '@angular/core';
import { Platform, Events, IonicApp, MenuController, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage, LoginPage } from './pages';
@Component({
  templateUrl: 'app.html'
})
export class TheScannerApp {
 /**
   * Nav help to change one page to another page
   * 
   * @type {Nav}
   * @memberof FinaxialApp
   */
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  appExitAlert: any;
  constructor(public events: Events,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
              private ionicApp: IonicApp,
              public menu: MenuController,
              private alertCtrl: AlertController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('ios')) {
       statusBar.styleDefault();
      } else {
        // set status bar to white
        statusBar.backgroundColorByHexString('#078ef5');
      }
      // let status bar overlay webview
      statusBar.overlaysWebView(true);

      splashScreen.hide();
    });

    this.events.subscribe('user::login', () => {
      this.rootPage = HomePage;
    });

    this.events.subscribe('user::logout', () => {
      this.rootPage = LoginPage;
    });


    let ready = true;
    platform.registerBackButtonAction(() => {
      let activePortal = ionicApp._loadingPortal.getActive() ||
        ionicApp._modalPortal.getActive() ||
        ionicApp._toastPortal.getActive() ||
        ionicApp._overlayPortal.getActive();
      if (activePortal) {
        ready = false;
        activePortal.dismiss();
        activePortal.onDidDismiss(() => { ready = true; });
        return;
      }
      if (menu.isOpen()) {
        menu.close();
        return;
      }
      //let view = this.nav.getActive();
      //let page = view ? this.nav.getActive().instance : null;
      if (this.nav.canGoBack()) {
        this.nav.pop();
      } else {
        if (this.appExitAlert) {
          this.appExitAlert.dismiss();
          this.appExitAlert = null;
        } else {
          this.showAppExitAlert();
        }
      }
    }, 1);

  }


  showAppExitAlert() {
    this.appExitAlert = this.alertCtrl.create({
      title: "Confirm",
      message: "Are you sure you want exit?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.appExitAlert = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.appExitAlert.present();
  }

}

