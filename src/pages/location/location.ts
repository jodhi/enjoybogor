import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data);
    this.address = navParams.data;
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


  ionViewDidLoad() {
    console.log('Hello LocationPage Page');
    this.loadMap();
  }

}
