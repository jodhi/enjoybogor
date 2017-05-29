import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
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
  public taken: any;
  public user_id:string;
  public sharePic;
  public points: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public userData: UserData,public toastCtrl: ToastController) {
    this.id = navParams.data;
    console.log("id nya : ",this.id);
    this.getData();
    this.userData.getID().then((user_id) => {
      this.user_id = user_id;
    });
    this.userData.getPoints().then((points) => {
      this.points = points;
    });
    this.taken = 0;
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

takeVoucher(){
  console.log("take voucher");
  let data_send = JSON.stringify({ voucher_id: this.id,user_id: this.user_id , points: this.points });
  this.http.post('http://localhost/enjoybogor-backend/api/take_voucher.php', data_send).subscribe(res => {
    let response = res.json();
    console.log(response);
    if (response['status']=='success'){
      console.log("success update");
      this.taken=1;
      this.navCtrl.pop();
    }
    this.showToast(response['message']);
  });
}

showToast(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3500,
      position: 'top'
    });
    toast.present();

}
}
