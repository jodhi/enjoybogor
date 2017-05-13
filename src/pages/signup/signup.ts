import { Component } from '@angular/core';

import { NavController, AlertController, LoadingController } from 'ionic-angular';

// import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

import { Http } from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, email?: string, password?: string, nama?: string, password2?: string, contact?: string} = {};
  submitted = false;

  constructor(public loadCtrl: LoadingController, public navCtrl: NavController, public userData: UserData, public http: Http, public alertCtrl: AlertController) {}

  onSignup(form) {
   // console.log(this.signup)
   this.submitted = true;

   if (form.valid) {
    let loading = this.loadCtrl.create({
        content: 'Mendaftarkan...'
    });
    loading.present();

   	let creds = JSON.stringify({username: this.signup.username, password: this.signup.password, password2: this.signup.password2, email: this.signup.email, user_name: this.signup.nama, user_contact: this.signup.contact});

   	this.http.post("http://localhost/enjoybogor-backend/api/signup.php", creds).subscribe(res=>{
   		// console.log(res);
   		let response = res.json();
      response = response['status'];
   		console.log(response);

   		if(response == "berhasil"){
   			this.showAlert(response);
   		}else{
   			this.showAlert(response);
   		}

      loading.dismiss();
   	});
   }
  }

  showAlert(data){
  	if(data == "berhasil"){
  		let alert = this.alertCtrl.create({
  			title: 'Pendaftaran Berhasil',
  			buttons: ['OK'],
        subTitle: 'login to continue.',
  		});
  		alert.present();
  		this.navCtrl.push(LoginPage);
  	}else if(data == "multiple"){
  		let alert = this.alertCtrl.create({
  			title: 'Pendaftaran Gagal',
  			subTitle: 'Username atau E-mail yang Anda masukkan sudah terdaftar.',
  			buttons: ['OK']
  		});
  		alert.present();
  	}else{
  		let alert = this.alertCtrl.create({
  			title: 'Error',
  			subTitle: 'Please report to admin.',
  			buttons: ['OK']
  		});
  		alert.present();
  	}
  }
}
