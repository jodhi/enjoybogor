import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController,public storage:Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
    this.storage.get('logged').then(done=>{
      if (!done) {
        this.navCtrl.setRoot(Login);
      }
    })
  }

}
