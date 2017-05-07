import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Intro } from '../intro/intro';
import { Register } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
  }
  navRegister(){
    console.log('Trigger register');
    this.navCtrl.setRoot(Register);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.storage.get('intro-done').then(done=>{
      if (!done) {
        //dibawah diganti ke true harusnya jika sudah login
        // if(login=='sukses') this.storage.set('intro-done',true);
        this.storage.set('intro-done', true); //seharusnya tidak ditaruh disini
        this.navCtrl.setRoot(Intro);
      }
    })
  }

}
