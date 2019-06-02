
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BasePage } from '../base';

import { HistoryPage } from '../history/history';
import { ContactPage } from '../contact/contact';
import { ScanPage } from './../scan/scan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {
  tab1Root = ScanPage;
  tab2Root = HistoryPage;
  tab3Root = ContactPage;
  
  constructor(public navCtrl: NavController) {
    super();
  }

}
