import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';

declare var google;
// todo: refresh page get data;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {

  }


  ionViewDidLoad() {
  	// this.getData();
    this.loadMap();
  }

  ionViewWillEnter() {

  }
  loadMap(){

  let latLng = new google.maps.LatLng(-6.59444, 106.78917);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

}

}
