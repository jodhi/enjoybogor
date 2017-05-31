import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude: any;
  longitude: any;
  address: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    console.log(navParams.data);
    this.address = navParams.data;
    this.getLocation(this.address);
  }

  getLocation(address){
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAg2V6O8KghN3wbg9FF8ECg5EJr5mw7-lE&address=bogor%20'+address).map(res => res.json()).subscribe(data => {

        console.log(data.results[0].geometry.location);
        this.latitude=data.results[0].geometry.location.lat;
        this.longitude=data.results[0].geometry.location.lng;
      this.loadMap(this.latitude,this.longitude);
    });
  }

  loadMap(latitude,longitude){

  let latLng = new google.maps.LatLng(latitude, longitude);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var  marker = new google.maps.Marker({
    position: latLng,
    map: this.map,
    title: 'Restaurant Location'
  });

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  marker.setMap(this.map);

}


  ionViewDidLoad() {
    console.log('Hello LocationPage Page');
  }

}
