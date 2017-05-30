import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ActionSheetController } from 'ionic-angular';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';
import '../../providers/user-data';

/*
  Generated class for the Cari page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cari',
  templateUrl: 'cari.html'
})
export class CariPage {
	public searchQuery = "";
  public posts;
  public httpErr = false;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public http: Http, public toastCtrl: ToastController) {
    // this.getData();
  }

  ionViewDidLoad() {
    console.log('Hello CariPage Page');
  }


  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/search.php?search='+this.searchQuery).subscribe(res => {
      this.posts = res.json();
      console.log(this.searchQuery);
      console.log('dapet data');
      console.log(res);
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});
  }

 getItems(searchbar){
   if(searchbar!=""){
 	   this.getData();
 }
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
