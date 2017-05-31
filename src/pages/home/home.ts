import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';

declare var google;
// todo: refresh page get data;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data;
  public httpErr = false;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {
    this.getData();
  }


  ionViewDidLoad() {
  	// this.getData();
    this.loadMap();
  }

  ionViewWillEnter() {

  }

  loadMap(){

  let latLng = new google.maps.LatLng(-34.9290, 138.6010);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

}

  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/top3.php').subscribe(res => {
      this.data = res.json();
      console.log('dapet data restaurant');
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});


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
