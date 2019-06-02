import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { BasePage } from '../base';
import { ScannedItem } from '../../models';


@Component({
  selector: 'page-enteritem',
  templateUrl: 'enteritem.html'
})
export class EnterItemPage extends BasePage{

  itemDetails:ScannedItem = new ScannedItem();
  constructor(public viewCtrl: ViewController) {
    super();
  }


  cancelPage(){
    this.viewCtrl.dismiss(null);
  }

  done() {
    this.viewCtrl.dismiss(this.itemDetails);
  }

  getDetailAboutItem(){
    let barcode = (Math.floor(Math.random() * 10) + 1).toString();
    this.itemDetails.name = "Entered Name " + barcode;
    this.itemDetails.details = "About item details here";

  }

}