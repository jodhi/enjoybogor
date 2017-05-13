import { Component } from '@angular/core';
import { NavController, App, ActionSheetController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';

import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-tulis-artikel',
  templateUrl: 'tulis-artikel.html'
})
export class TulisArtikelPage {

  public isi_artikel: string;
  public judul_artikel: string;
  public input: string;
  public id_kategori = 1;
  public id_topik = 0;
  public id_komoditas = 0;
  public id_user_input: any;
  public koms;
  public tops;
  public kats;
  public noInput = false;
  public gambar: string;

  constructor(public loadCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public app: App, public http: Http, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public userData: UserData) {

  }

  ionViewDidLoad() {
    console.log('Hello TulisArtikelPage Page');
    this.http.get('http://cybex.ipb.ac.id/api/all_komoditas.php').subscribe(res => {
      this.koms = res.json();
    });

    this.http.get('http://cybex.ipb.ac.id/api/all_topik.php').subscribe(res => {
      this.tops = res.json();
    });

    this.http.get('http://cybex.ipb.ac.id/api/all_kategori.php').subscribe(res => {
      this.kats = res.json();
    });

    if(this.userData.loginState){
      this.userData.getID();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Anda belum login',
        subTitle: 'Silakan lakukan login terlebih dahulu untuk dapat menulis artikel baru',
        buttons: [{
            text: 'Login',
            handler: () => {
              this.app.getRootNav().setRoot(LoginPage);
          }},{
            text: 'Batal',
            role: 'cancel',
            handler: () =>{
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

  }

  dariKamera() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.gambar = base64Image;
    }, (err) => {
     console.log(err);
     alert('Tidak bisa ambil gambar');
    });
  }

  dariGaleri() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.gambar = base64Image;
    }, (err) => {
     console.log(err);
     alert('Tidak bisa ambil gambar');
    });
  }

  kirim() {
      if(this.isi_artikel == undefined || this.judul_artikel == undefined || this.id_kategori == undefined || !this.isi_artikel || !this.judul_artikel || !this.id_kategori){
        this.noInput = true;
      }
      else{
        let loading = this.loadCtrl.create({
            content: 'Memposting artikel Anda...'
        });
        loading.present();

        this.id_user_input = this.userData.ids;
        this.input = JSON.stringify({isi_artikel: this.isi_artikel, judul_artikel: this.judul_artikel,
          id_kategori: this.id_kategori, id_topik: this.id_topik, id_komoditas: this.id_komoditas, id_user_input: this.id_user_input, gambar: this.gambar});
        console.log(this.input);
        this.http.post("http://cybex.ipb.ac.id/api/tulis_artikel.php", this.input).subscribe(data => {
            let v = data.json();
            this.showToast(v['message']);
            this.navCtrl.pop();
        });

        loading.dismiss();
      }
  }

  showToast(val){
    if(val === "sukses"){
      let toast = this.toastCtrl.create({
        message: 'Artikel berhasil dibuat. Artikel Anda sedang diverifikasi sebelum dipublikasikan.',
        duration: 3500,
        position: 'top'
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: '(x) Gagal membuat artikel',
        duration: 3500,
        position: 'top'
      });
      toast.present();
    }

  }


  ambilGambar() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Kamera',
          role: 'tulisArtikel',
          handler: () => {
            console.log('Kamera clicked');
            this.dariKamera();
          }
        },
        {
          text: 'Galeri',
          role: 'tulisDiskusi',
          handler: () => {
            console.log('Galeri clicked');
            this.dariGaleri();
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

}
