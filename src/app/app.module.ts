
import { BrowserModule } from '@angular/platform-browser';

import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { TheScannerApp } from './app.component';


import {setAppInjector} from './app-injector';


//Pages
import { HomePage, LoginPage, HistoryPage,ContactPage,ScanPage,EnterItemPage } from './pages';

//Views
import { LogoView } from './views';

//Services
import { CommonService, LocaleService, WebClientService,LoadingViewService} from './providers';


@NgModule({
  declarations: [
    TheScannerApp,
    HomePage,
    LogoView,
    LoginPage,
    HistoryPage,
    ContactPage,
    ScanPage,
    EnterItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TheScannerApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TheScannerApp,
    HomePage,
    LoginPage,
    HistoryPage,
    ContactPage,
    ScanPage,
    EnterItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonService,
    WebClientService,
    LocaleService,
    LoadingViewService,
    BarcodeScanner
  ]
})
export class AppModule {

   /**
     * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
     * This is good to prevent injecting the service as constructor parameter.
     */
    static injector: Injector;
    constructor(injector: Injector) {
        setAppInjector(injector);
    }
}
