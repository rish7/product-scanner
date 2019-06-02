import { Component } from '@angular/core';
import { Events,NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';


import { BasePage } from '../base';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage{


  loginCredentials:any = { email: '', password: '' };
  constructor(public navCtrl: NavController, private events: Events) {
    super();
  }


  login(loginForm: NgForm){

    if(loginForm.valid){
      this.events.publish('user::login');
    }
  }

}
