import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';

import 'rxjs/add/operator/map';
/*
  Generated class for the VoucherDetail page

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-voucher-detail',
  templateUrl: 'voucher-detail.html'
})
export class VoucherDetailPage {
  public id: any;
  public posts: any;
  public comments: any;
  public sharePic;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public userData: UserData) {
    this.id = navParams.data;
    console.log("id nya : ",this.id);
    this.getData();
  }


  islogin(){
    if(this.userData.loginState){
      return true;
    }else{
      return false;
    }
  }

  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/detail_voucher.php?id='+this.id).map(res => res.json()).subscribe(data => {
        this.posts = data;

    });


  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }

  ionViewWillEnter() {
    this.getData();
  }



}
