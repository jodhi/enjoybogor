import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ActionSheetController } from 'ionic-angular';
import { VoucherDetailPage } from '../voucher-detail/voucher-detail';
import '../../providers/user-data';


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
    this.http.get('http://localhost/enjoybogor-backend/api/show_vouchers.php').subscribe(res => {
      this.posts = res.json();
      console.log("dapat data vouchers");
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});
  }

  // doInfinite(infiniteScroll) {
  //
  //   setTimeout(() => {
  //     this.limit = this.limit+5;
  //
  //     this.http.get('http://cybex.ipb.ac.id/api/all_artikel.php?limit='+this.limit).subscribe(res => {
  //       this.posts = this.posts.concat(res.json());
  //     });
  //
  //     infiniteScroll.complete();
  //   }, 500);
  //  }

  baca(id_voucher){
    this.navCtrl.push(VoucherDetailPage, id_voucher);
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
