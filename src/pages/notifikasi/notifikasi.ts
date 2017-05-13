import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';


/*
  Generated class for the Notifikasi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifikasi',
  templateUrl: 'notifikasi.html'
})
export class NotifikasiPage {
  public id_user = 12;
  public nots: any;
  public limit = 0;

  constructor(public navCtrl: NavController, public http: Http) {
  	this.getData();
  }

  ionViewDidLoad() {
    console.log('Hello NotifikasiPage Page');
    this.getData();
  }

  getData() {
    this.http.get('http://cybex.ipb.ac.id/api/notifikasi.php?iduser='+this.id_user+'&limit='+this.limit).subscribe(res => {
      this.nots = res.json();
    });
  }

  baca(idArtikel){
    this.navCtrl.push(ArtikelBacaPage, idArtikel);
  }

  doRefresh(refresher) {
      this.limit = 0;

      setTimeout(() => {
        this.getData();
        refresher.complete();
      }, 1500);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.limit = this.limit+5;

      this.http.get('http://cybex.ipb.ac.id/api/notifikasi.php?iduser='+this.id_user+'&limit='+this.limit).subscribe(res => {
        this.nots = this.nots.concat(res.json());
      });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
   }

}
