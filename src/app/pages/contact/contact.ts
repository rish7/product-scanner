import { Component } from '@angular/core';
import { Events,NavController } from 'ionic-angular';

import { BasePage } from '../base';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage extends BasePage{

  constructor(public navCtrl: NavController, private events: Events) {
    super();
  }

  logout(){
      let self = this;
      self.showAlert(self.getLocale("ARE_U_SURE"), () => {
        self.events.publish('user::logout');
      },self,"Logout");
  }

}