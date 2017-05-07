import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class Intro {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  navLogin(){
    this.navCtrl.setRoot(Login);
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Intro');
  }

}
