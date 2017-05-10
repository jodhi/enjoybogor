import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Intro } from '../intro/intro';
import { Home } from '../home/home';
import { Register } from '../register/register';
import { Http, RequestOptions } from '@angular/http';
import { Validators, FormBuilder,FormGroup  } from '@angular/forms';
import { MenuController} from 'ionic-angular';

// jika sudah login in, this.storage.get('logged',true);
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {

  private logindata : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public http:Http, private formBuilder: FormBuilder,public menuCtrl: MenuController ) {
    this.logindata = this.formBuilder.group({
      username: ['',Validators.required],
      password:['',Validators.required]
    });
  }
  navRegister(){
    console.log('Trigger register');
    this.navCtrl.setRoot(Register);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.storage.get('intro-done').then(done=>{
      if (!done) {
        //dibawah diganti ke true harusnya jika sudah login
        // if(login=='sukses') this.storage.set('intro-done',true);
        this.storage.set('intro-done', true); //seharusnya tidak ditaruh disini
        this.navCtrl.setRoot(Intro);
      }
    })
  }
  ionViewDidEnter() {
  this.menuCtrl.swipeEnable(false, 'menu1');
}
  submit(){
    let type="login";
    let datauser=this.logindata.value.username;
    let datapass=this.logindata.value.password;
      // console.log(datauser);
      // console.log(datapass);


    let link= "http://localhost/enjoybogor-back/Users/api.php";
    let options = {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
//
    let postParams = {
      "type":type,
      "username": datauser,
      "password": datapass
    }
    this.http.post(link,postParams,options)
    .subscribe(data=>{
      // console.log(data['_body']);
      let input_get = JSON.parse(data['_body']);
      if(input_get.status==="true"){
        this.storage.set('logged',true);
        this.storage.set('username',datauser);
        this.navCtrl.setRoot(Home);
      }
      console.log(input_get.status);
    }, error=>{
      console.log(error);
    });
  }

}
