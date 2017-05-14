import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';

// todo: refresh page get data;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
gambar : string;

  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {

  }


  ionViewDidLoad() {
  	// this.getData();
    this.gambar="https://www.w3schools.com/css/img_fjords.jpg";
  }

  ionViewWillEnter() {

  }
}
