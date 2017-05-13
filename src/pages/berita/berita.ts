import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';
import { NotifikasiPage } from '../notifikasi/notifikasi';
/*
  Generated class for the Berita page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-berita',
  templateUrl: 'berita.html'
})
export class BeritaPage {
  public posts;
  public limit = 0;
  public httpErr = false;

  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {
  	this.getData();
  }

  ionViewDidLoad() {
  	// this.getData();
  }

  ionViewWillEnter() {
    this.limit = 0;
    this.getData();
  }

  notif() {
    this.navCtrl.push(NotifikasiPage);
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 1500);
  }

  getData() {
    this.http.get('http://cybex.ipb.ac.id/api/all_berita.php?limit='+this.limit).subscribe(res => {
      this.posts = res.json();
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.limit = this.limit+5;

      this.http.get('http://cybex.ipb.ac.id/api/all_berita.php?limit='+this.limit).subscribe(res => {
        this.posts = this.posts.concat(res.json());
        // this.httpErr = false;
      });

      infiniteScroll.complete();
    }, 500);
   }

  baca(idArtikel){
    this.navCtrl.push(ArtikelBacaPage, idArtikel);
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
