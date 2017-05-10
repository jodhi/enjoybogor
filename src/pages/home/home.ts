import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';
import { MenuController} from 'ionic-angular';
import { Http } from '@angular/http';
 var username_global;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  public user_name:  any;
  public contact:  any;
  public email:  any;
  public points:  any;
  constructor(public navCtrl: NavController,public storage:Storage,public menuCtrl: MenuController ,public http:Http) {
  }
  ionViewDidLoad() {

//page check auth
    console.log('ionViewDidLoad Home');
    this.menuCtrl.swipeEnable(true, 'menu1');
    this.storage.get('logged').then(done=>{
      if (!done) {
        this.navCtrl.setRoot(Login);
      }
    });
    let username= username_global;
    this.storage.get('username').then(usernamedat=>{
      this.getData(usernamedat);
    });

    console.log(username);
    let postParams = {
      "type":"info_user",
      "username": username
    }
//get info_user

  let link= "http://192.168.1.4/enjoybogor-back/Users/api.php";
  let options = {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      };
  this.http.post(link,postParams,options)
.subscribe(data=>{
  // console.log(data['_body']);
  let input_get = JSON.parse(data['_body']);

  this.user_name = input_get.user_name;
  this.contact = input_get.contact;
  this.email = input_get.email;
  this.points=input_get.points;


  console.log(this.user_name);
}, error=>{
  console.log(error);
});





  }
  getData(dat){
    username_global= dat;
  }
}
