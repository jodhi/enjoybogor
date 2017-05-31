import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';

declare var google;
// todo: refresh page get data;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {

  }


  ionViewDidLoad() {
  	// this.getData();
  }

  ionViewWillEnter() {

  }


}
