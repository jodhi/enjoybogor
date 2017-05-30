import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import 'rxjs/add/operator/map';

/*
  Generated class for the TulisKomentar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tulis-komentar',
  templateUrl: 'tulis-komentar.html'
})
export class TulisKomentarPage {
  public id: any;
  public isi_komentar: string;
  public id_user_input;
  public input: string;
  public noInput = false;
  public rating: string;
  public rating_value: string;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public userData: UserData) {
  	this.id = navParams.data;
  }

  ionViewDidLoad() {
    this.userData.getID();
  }

   kirim() {
      if(this.isi_komentar == undefined || !this.isi_komentar || !this.rating_value){
        this.noInput = true;
      }else{
        this.id_user_input = this.userData.ids;
        this.input = JSON.stringify({restaurant_id: this.id , comment: this.isi_komentar, user_id: this.id_user_input, rating: this.rating_value});
        console.log(this.input);
        this.http.post("http://localhost/enjoybogor-backend/api/comment_rate.php", this.input).subscribe(data => {
          console.log(data);
          let response = data.json();
          if (response['status']=='success'){
            console.log("success update");
            // this.showToast(response['message']);
            this.navCtrl.pop();
          }
          this.showToast(response['message']);
        });
      }
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
