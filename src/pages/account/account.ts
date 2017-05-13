import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  name: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {

  }

  ngAfterViewInit() {
    this.getUsername();
    this.getName();
  }


  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing


  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  getName() {
    this.userData.getName().then((username) => {
      this.name = username;
    });
  }


  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }
}
