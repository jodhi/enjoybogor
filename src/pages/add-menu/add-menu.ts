import { Component } from '@angular/core';
import { NavController,NavParams, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http } from '@angular/http';
/*
  Generated class for the AddMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-menu',
  templateUrl: 'add-menu.html',
})
export class AddMenuPage {

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public userData: UserData){
      this.id = navParams.data;
    }

  ionViewDidLoad() {
    console.log('Hello AddMenuPage Page');
    this.userData.getID();
  }
  public id: any;
  public id_user_input;
  public input: string;
  public noInput = false;
  public food_name: string;
  public price: any;
  public portion_size: string;
  public menu_description: string;




   kirim() {
      if(!this.food_name || !this.price){
        this.noInput = true;
      }else{
        this.id_user_input = this.userData.ids;
        this.input = JSON.stringify({restaurant_id: this.id , food_name: this.food_name, price: this.price, portion_size: this.portion_size, menu_description:this.menu_description});
        console.log(this.input);
        this.http.post("http://localhost/enjoybogor-backend/api/tambah_menu.php", this.input).subscribe(data => {
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
