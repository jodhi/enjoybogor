import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';

declare var google;
// todo: refresh page get data;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data;
  public httpErr = false;

  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {
    this.getData();
  }


  ionViewDidLoad() {
  	// this.getData();
  }

  ionViewWillEnter() {
this.getData();
  }

  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/top3.php').subscribe(res => {
      this.data = res.json();
      console.log('dapet data restaurant');
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});


  }

  baca(id_restaurant){
    this.navCtrl.push(ArtikelBacaPage, id_restaurant);
  }

  showAlert(status){
   if(status == 0){
     let toast = this.toastCtrl.create({
       message: 'No connection, Please check your internet connection',
       position: 'bottom',
       showCloseButton: true,
       closeButtonText: 'X'
     });
     toast.present();
   }else{
     let toast = this.toastCtrl.create({
       message: 'Cannot connect to server, please reload this page',
       position: 'bottom',
       showCloseButton: true,
       closeButtonText: 'X'
     });
     toast.present();
   }

   this.httpErr = true;
 }
}
