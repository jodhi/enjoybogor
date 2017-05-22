import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';



@Component({
  selector: 'page-myvoucher',
  templateUrl: 'myvoucher.html'
})
export class MyvoucherPage {

  public limit = 0;
  public httpErr = false;
  public posts;
  constructor(public navCtrl: NavController, public http: Http, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('Hello MyvoucherPage Page');
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
