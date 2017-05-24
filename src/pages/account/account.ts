import { Component } from '@angular/core';

import { AlertController, NavController,LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

import { Http } from '@angular/http';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  name: string;
  email: string;
  contact: string;
  points: number;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData, public http: Http, public loadCtrl: LoadingController) {
    this.userData.getUsername().then((username) => {
      this.username = username;
      this.getInfo();
    });
  }

  ngAfterViewInit() {
    this.getInfo();
  }

  ionViewWillEnter() {
    this.getInfo();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getInfo();
      refresher.complete();
    }, 1500);
  }

getInfo(){
  let creds = JSON.stringify({username: this.username  });
  let loading = this.loadCtrl.create({
      content: 'Mengecek...'
  });
  this.http.post('http://localhost/enjoybogor-backend/api/account.php', creds).subscribe(res => {
    let response = res.json();

    console.log(response['status']);
    loading.dismiss();
    if (response['status']){


        this.userData.setId(response['id']);
        this.userData.login(response['username'], response['name'],response['contact'],response['email'],response['points']);
        this.name = response['name'];
        this.points = response['points'];
        this.email = response['email'];
        this.contact = response['contact'];

    }


  });
}
  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing






  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }
}
