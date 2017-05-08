import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Intro } from '../intro/intro';
import { Register } from '../register/register';
import { Http, Headers, RequestOptions } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  logindata={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public http:Http) {

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
  login(){
    // console.log(this.username);
    // console.log($scope.userpassword);
    console.log(this.logindata['username']);
    var headers = new Headers();
    // headers.append("Accept","application/json");
    // headers.append("Content-type","application/json");
    let link= "http://192.168.33.10/enjoybogor-back/Users/api.php";
    let options = new RequestOptions({ headers : headers});
//
    let postParams = {
      "username": "there",
      "password": "secret"
    }
    this.http.post(link,postParams,options)
    .subscribe(data=>{
      console.log(data['_body']);
    }, error=>{
      console.log(error);
    });
  }

}
