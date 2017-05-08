import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { MenuController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class Intro {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController ) {
  }
  navLogin(){
    this.navCtrl.setRoot(Login);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Intro');
  }
  ionViewDidEnter() {
  this.menuCtrl.swipeEnable(false, 'menu1');
}




}
