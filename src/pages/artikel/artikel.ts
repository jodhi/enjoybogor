import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ActionSheetController } from 'ionic-angular';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';
import { TulisArtikelPage } from '../tulis-artikel/tulis-artikel';
import { TulisDiskusiPage } from '../tulis-diskusi/tulis-diskusi';
import '../../providers/user-data';

/*
  Generated class for the Artikel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-artikel',
  templateUrl: 'artikel.html'
})
export class ArtikelPage {

	public posts;
  public limit = 0;
  public httpErr = false;

  constructor(public navCtrl: NavController, public http: Http, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
    this.getData();
  }

  ionViewDidLoad() {
    //this.getData();
  }

  ionViewWillEnter() {
    this.limit = 0;
    this.getData();
  }



  doRefresh(refresher) {
    this.limit =0;
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }

  getData() {
    this.http.get('http://cybex.ipb.ac.id/api/all_artikel.php?limit='+this.limit).subscribe(res => {
      this.posts = res.json();
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.limit = this.limit+5;

      this.http.get('http://cybex.ipb.ac.id/api/all_artikel.php?limit='+this.limit).subscribe(res => {
        this.posts = this.posts.concat(res.json());
      });

      infiniteScroll.complete();
    }, 500);
   }

  baca(idArtikel){
    this.navCtrl.push(ArtikelBacaPage, idArtikel);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Tulis Artikel',
          role: 'tulisArtikel',
          handler: () => {
            console.log('Tulis Artikel clicked');
            this.navCtrl.push(TulisArtikelPage);
          }
        },{
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
        message: 'Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda.',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'X'
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: 'Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini.',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'X'
      });
      toast.present();
    }

    this.httpErr = true;
  }

}
