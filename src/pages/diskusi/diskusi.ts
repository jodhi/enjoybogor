import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

// import { HTTP } from 'ionic-native';

import { ActionSheetController } from 'ionic-angular';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';
import { TulisDiskusiPage } from '../tulis-diskusi/tulis-diskusi';
import '../../providers/user-data';

@Component({
  selector: 'page-diskusi',
  templateUrl: 'diskusi.html'
})
export class DiskusiPage {
  public diskusi;
  public isi;
  public httpErr = false;

  public response;
  public items;

  public iseng;

  constructor(public navCtrl: NavController, public http: Http, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
     this.getData();
  }

  ionViewDidLoad() {
    //this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }



  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/show_restaurants.php').subscribe(res => {
      this.diskusi = res.json();
      console.log('dapet data restaurant');
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});


  }


  baca(id_restaurant){
    this.navCtrl.push(ArtikelBacaPage, id_restaurant);
  }

 presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Tambah Restaurant',
          role: 'tulisDiskusi',
          handler: () => {
            console.log('Tambah Restaurant clicked');
            this.navCtrl.push(TulisDiskusiPage);
          }
        },{
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
