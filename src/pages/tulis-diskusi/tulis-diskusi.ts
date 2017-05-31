import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, App,  ActionSheetController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

declare var google;

@Component({
  selector: 'page-tulis-diskusi',
  templateUrl: 'tulis-diskusi.html'
})
export class TulisDiskusiPage {

  public restaurant_name: string;
  public restaurant_description: string;
  public restaurant_address:string;
  public restaurant_contact:string;
  public restaurant_category:string;
  public image:string;
  public input: string;
  public id_user_input: any;
  public noInput = false;
  public local;
  public latitude: any;
  public longitude: any;
  public map_status = false;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public loadCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public app: App, public http: Http, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public userData: UserData) {

  }


  ionViewDidLoad() {
    console.log('entering tambah restauran');



   if(this.userData.loginState){
     this.userData.getID();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Anda belum login',
        subTitle: 'Silakan lakukan login terlebih dahulu untuk dapat menambahkan restaurant baru',
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


 getLocation(address){
   this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAg2V6O8KghN3wbg9FF8ECg5EJr5mw7-lE&address=bogor%20'+address).map(res => res.json()).subscribe(data => {
     if(data.status!="OK"){
       console.log("fail");
       this.map_status = false;
     }else{
       this.map_status = true;
       console.log(data.results[0].geometry.location);
       this.latitude=data.results[0].geometry.location.lat;
       this.longitude=data.results[0].geometry.location.lng;
     }
   });
 }





  kirim() {
      if(this.restaurant_description == undefined || this.restaurant_name == undefined || !this.restaurant_description || !this.restaurant_name){
        this.noInput = true;
      }else{
        let loading = this.loadCtrl.create({
            content: 'Memposting Data Anda...'
        });
        loading.present();

        this.id_user_input = this.userData.ids;
        this.input = JSON.stringify({restaurant_description: this.restaurant_description, restaurant_name: this.restaurant_name, restaurant_address: this.restaurant_address , restaurant_contact: this.restaurant_contact , restaurant_category:this.restaurant_category,image:this.image,latitude:this.latitude,longitude:this.longitude });
        console.log(this.input);
        this.http.post("http://localhost/enjoybogor-backend/api/tambah_restaurant.php", this.input).subscribe(data => {
          let v = data.json();
          this.showToast(v['message']);
          this.navCtrl.pop();
        });

        loading.dismiss();
      }
  }

  showToast(val){
    if(val == "sukses"){
      let toast = this.toastCtrl.create({
        message: 'Restaurant berhasil ditambahkan. Harap menunggu validasi admin',
        duration: 3500,
        position: 'top'
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: '(x) Gagal menambahkan restaurant',
        duration: 3500,
        position: 'top'
      });
      toast.present();
    }

  }


}
