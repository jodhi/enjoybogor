import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-showphotos',
  templateUrl: 'showphotos.html'
})
export class ShowphotosPage {
  id: string;
  posts: any;
  nodata: number;
  constructor(public navCtrl: NavController,public navParams: NavParams,public http: Http) {
    console.log(navParams.data);
    this.id = navParams.data;
    this.getData();
    this.nodata = 0;
  }

  ionViewDidLoad() {
    console.log('Hello ShowphotosPage Page');
    console.log('id: ',this.id);
    this.getData();
  }
  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/show_photos.php?restaurant_id='+this.id).map(res => res.json()).subscribe(data => {

        if(data['status']=="nodata"){
        this.nodata = 1;  
        }
        this.posts = data;

    });
    console.log(this.posts);
  }
}
