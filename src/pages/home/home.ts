import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';
import { MenuController} from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController,public storage:Storage,public menuCtrl: MenuController ) {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Home');
    this.menuCtrl.swipeEnable(true, 'menu1');
    this.storage.get('logged').then(done=>{
      if (!done) {
        this.navCtrl.setRoot(Login);
      }
    })
  }

}
