import { Component } from '@angular/core';
import { Events,NavController } from 'ionic-angular';

import { BasePage } from '../base';
import { ScannedItem } from '../../models';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage extends BasePage{
  public requestItems: Array<{ "requestDate": Date, "scannedItems": Array<ScannedItem> }> = [];

  constructor(public navCtrl: NavController, private events: Events) {
    super();
    this.requestItems = this.commonService.getHistoryData();
  }

  ionViewDidLoad() {
    
  }

  getDateFormat(requestDate:Date){
      return  this.commonService.getDateFormat(requestDate);
  }

  sendData(scanneditem){
    this.showOkAlert("Added",()=>{});
    this.events.publish('scan::additem', { ...scanneditem });
  }



}