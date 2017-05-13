import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import 'rxjs/add/operator/map';

/*
  Generated class for the TulisKomentar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tulis-komentar',
  templateUrl: 'tulis-komentar.html'
})
export class TulisKomentarPage {
  public id_artikel: any;
  public isi_komentar: string;
  public id_user_input;
  public input: string;
  public noInput = false;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public userData: UserData) {
  	this.id_artikel = navParams.data;
  }

  ionViewDidLoad() {
    this.userData.getID();
  }

   kirim() {
      if(this.isi_komentar == undefined || !this.isi_komentar){
        this.noInput = true;
      }else{
        this.id_user_input = this.userData.ids;
        this.input = JSON.stringify({id_artikel: this.id_artikel, isi_komentar: this.isi_komentar, id_user_input: this.id_user_input});
        console.log(this.input);
        this.http.post("http://cybex.ipb.ac.id/api/tulis_komentar.php", this.input).subscribe(data => {
            let v = data.json();
            this.showToast(v['message']);
            this.navCtrl.pop();
        });
      }
  }

  showToast(val){
    if(val === "sukses"){
      let toast = this.toastCtrl.create({
        message: 'Komentar berhasil ditambahkan',
        duration: 3500,
        position: 'top'
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: '(x) Gagal membuat komentar',
        duration: 3500,
        position: 'top'
      });
      toast.present();
    }

  }

}
