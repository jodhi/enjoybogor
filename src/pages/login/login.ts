import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Intro } from '../intro/intro';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.storage.get('intro-done').then(done=>{
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(Intro);
      }
    })
  }

}
