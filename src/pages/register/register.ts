import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { MenuController} from 'ionic-angular';
import { Http, RequestOptions } from '@angular/http';
import { Validators, FormBuilder,FormGroup  } from '@angular/forms';
/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  private registerdata : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,public http:Http, private formBuilder: FormBuilder) {
    this.registerdata = this.formBuilder.group({
      username: ['',Validators.required],
      password:['',Validators.required],
      name:['',Validators.required],
      contact:['',Validators.required],
      email:['',Validators.required]
    });
  }
  navLogin(){
    console.log('Trigger login');
    this.navCtrl.setRoot(Login);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  ionViewDidEnter() {
  this.menuCtrl.swipeEnable(false, 'menu1');
}
submit(){
  let type="register";
  let datauser=this.registerdata.value.username;
  let datapass=this.registerdata.value.password;
  let dataname=this.registerdata.value.name;
  let datacontact=this.registerdata.value.contact;
  let dataemail=this.registerdata.value.email;



  let link= "http://192.168.1.4/enjoybogor-back/Users/api.php";
  let options = {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      };
//
  let postParams = {
    "type":type,
    "username" :  datauser,
    "password" : datapass,
    "user_name" : dataname,
    "user_contact" : datacontact,
    "email" : dataemail

  }
  this.http.post(link,postParams,options)
  .subscribe(data=>{
    // console.log(data['_body']);
    let input_get = JSON.parse(data['_body']);
    if(input_get.status==="true"){
      this.navCtrl.setRoot(Login);
    }
    console.log(input_get.status);
  }, error=>{
    console.log(error);
  });
}
}
