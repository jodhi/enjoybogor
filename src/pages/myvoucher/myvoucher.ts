import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-myvoucher',
  templateUrl: 'myvoucher.html'
})
export class MyvoucherPage {
  public user_id;
  public get = false;
  public limit = 0;
  public httpErr = false;
  public nodata = false;
  public posts;
  public redeem_stat;
  constructor(public navCtrl: NavController, public http: Http, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public UserData: UserData, public alertCtrl: AlertController) {
    this.UserData.getID().then((user_id) => {
      this.user_id = user_id;
    });
  }

  ionViewDidLoad() {
    console.log('Hello MyvoucherPage Page');
  }

  ionViewWillEnter() {
    this.limit = 0;
    this.getData();
  }



  doRefresh(refresher) {
    this.limit =0;
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }

  getData() {
    console.log(this.user_id);
    this.http.post("http://localhost/enjoybogor-backend/api/show_myvoucher.php",{id:this.user_id}).subscribe(res => {

      console.log(res);
      this.nodata=false;
      this.posts = res.json();
      this.get = true;
      if(this.posts['status']=="nodata"){
        this.nodata=true;
        console.log("nodata true");
      }
      console.log("dapat data myvouchers");
      this.httpErr = false;
    }
    );
  }
redeem(voucher_id){
  this.http.post("http://localhost/enjoybogor-backend/api/redeem_voucher.php",{user_id:this.user_id, voucher_id:voucher_id}).subscribe(res => {

    console.log(res);
    this.redeem_stat = res.json();
    if(this.redeem_stat['status']=="ok"){
      console.log("berhasillll");
      this.nodata=false;
      this.getData();
    }else{
      console.log("gagalll");
    }
    this.httpErr = false;
  }
  );
}

showAlertSuccess(voucher_name) {
  let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: '" '+voucher_name+ ' "  has been redeemed',
    buttons: ['OK']
  });
  alert.present();
}

presentConfirm(voucher_id,voucher_name) {
  let alert = this.alertCtrl.create({
    title: 'Confirm Redeem',
    message: 'Are you sure want to redeem this voucher? " '+voucher_name+ ' "',
    buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Redeem',
        handler: () => {
          console.log('Yes clicked');
          this.redeem(voucher_id);
          this.showAlertSuccess(voucher_name);
          this.getData();
        }
      }
    ]
  });
  alert.present();
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
