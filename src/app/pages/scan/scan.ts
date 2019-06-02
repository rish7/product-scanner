import { Component } from '@angular/core';
import { NavController, ModalController, Events, ToastController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BasePage } from '../base';
import { ScannedItem } from '../../models';
import { EnterItemPage } from '../enteritem/enteritem';


@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage extends BasePage {
  scannedItems: Array<ScannedItem> = [];
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private events: Events) {
    super();
    let self = this;
    this.events.subscribe('scan::additem', (data) => {
        if(data){
          const existingItemName = self.getItemNameAlreadyPresent(data.id);
          if (existingItemName && existingItemName != "") {
            self.IncreaseQuantityForProduct(data.id, data.quantity);
          } else {
            self.scannedItems.push(data);
          }
        }
    });
  }

  quantityChanged(value, traget) {
    if (isNaN(value) || value == "0" || value == 0) {
      traget.value = "1";
    } else {
      traget.value = parseInt(traget.value).toString(); //If user enter float value.. covert to int
    }

  }
  /**
   * deleteItem  -- Delete item from list
   * @param index number
   */
  deleteItem(index: number) {
    let self = this;
    self.showAlert(self.getLocale("ARE_U_SURE"), () => {
      self.scannedItems.splice(index, 1);
    });

  }

  submitRequest() {
    let self = this;
    self.showLoader();
    setTimeout(()=>{
      self.showOkAlert("Request submitted successfully", () => {
        self.commonService.updateHistoryData(self.scannedItems);
        self.scannedItems = [];
      });
    }, 1000);
    
    
  }

  startScanItem() {
    //TODO:Call Bar code Scanner ccode here
    //let barcode = (Math.floor(Math.random() * 10) + 1).toString();
    let self = this;
    this.barcodeScanner.scan({
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 400, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
  }).then(barcodeData => {
      if(barcodeData && barcodeData.text && barcodeData.text == ""){
        self.showOkAlert("Unable to scan item", ()=>{});
        return;
      }
      self.successScanCallback(barcodeData.text);
     }).catch(err => {
      self.showOkAlert("Unable to scan item", ()=>{});
     });
    
   
  }

  successScanCallback(barcode: string) {
    let self = this;
    const existingItemName = self.getItemNameAlreadyPresent(barcode);
    if (existingItemName && existingItemName != "") {

      self.showAlert(self.getLocaleFormatStringFunction("ITEM_ALREADY_SCANNED")(existingItemName), () => {
        self.IncreaseQuantityForProduct(barcode, 1);
      });
      return;
    }

    self.scannedItems.push({
      id: barcode + '',
      name: "Scan Item " + (self.scannedItems.length + 1),
      details: "Details if any",
      quantity: 1
    });
  }

  getItemNameAlreadyPresent(barcode): string {
    var name = null;
    this.scannedItems.forEach(scannedItem => {
      if (barcode == scannedItem.id) {
        name = scannedItem.name;
      }
    });
    return name;
  }

  IncreaseQuantityForProduct(barcode: string, quantity: number, isManual?:boolean): boolean {
    var isPresent = false;
    this.scannedItems.map(scannedItem => {
      if (barcode == scannedItem.id) {
        scannedItem.quantity = (parseInt(scannedItem.quantity+'') + quantity);

        if(!isManual){
          const toast = this.toastCtrl.create({
            message: `${scannedItem.name} item quantity increased to ${scannedItem.quantity}`,
            duration: 2000
          });
          toast.present();
        }
        

      }
    });
    return isPresent;
  }

  enterItemDetail() {
    const itemDetailsModal = this.modalCtrl.create(EnterItemPage);
    itemDetailsModal.onDidDismiss(data => {
      if(!data){
        return;
      }
      const existingItemName = this.getItemNameAlreadyPresent(data.id);
      if (existingItemName && existingItemName != "") {

        this.showAlert(this.getLocaleFormatStringFunction("ITEM_ALREADY_SCANNED")(existingItemName), () => {
          this.IncreaseQuantityForProduct(data.id, 1);
        });
        return;
      }

      this.scannedItems.push(data);

    });
    itemDetailsModal.present();
  }


 

}