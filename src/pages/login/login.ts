import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

import { Http } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public loadCtrl: LoadingController, public navCtrl: NavController, public userData: UserData, public http: Http, public alertCtrl: AlertController) { }

  onLogin(form) {
    let creds = JSON.stringify({username: this.login.username, password: this.login.password});

    // console.log(creds);

    let loading = this.loadCtrl.create({
        content: 'Mengecek...'
    });
    loading.present();

    if(!this.login.username || !this.login.password){
      loading.dismiss();
      this.showAlert();
    }else{

        this.http.post('http://localhost/enjoybogor-backend/api/login.php', creds).subscribe(res => {
          let response = res.json();

          console.log(response['status']);
          loading.dismiss();
          if (response['status']){
            this.submitted = true;

            if (form.valid) {
              this.userData.setToken(response['token']);
              this.userData.setId(response['id']);
              this.userData.login(response['username'], response['name'],response['contact'],response['email'],response['points']);
              this.navCtrl.push(TabsPage);
            }
          }
          else {
            loading.dismiss();
            this.showAlert();
          }

        });
      }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Gagal',
      subTitle: 'Username atau Password salah',
      buttons: ['OK']
    });
    alert.present();
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
