import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { MenuController} from 'ionic-angular';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
  }
  navLogin(){
    console.log('Trigger login');
    this.navCtrl.setRoot(Login);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  ionViewDidEnter() {
  this.menuCtrl.swipeEnable(false, 'menu1');
}

}
