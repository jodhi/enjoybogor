import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  public loginState = false;
  public token;
  public ids;
  public input: string;
  public jwt: any;
  public out;

  constructor(public events: Events, public storage: Storage, public http: Http) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  setToken(token) {
    this.storage.set('token', token);
  }

  setId(id) {
    this.storage.set('id', id);
  }

  login(username, keterangan) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('keterangan', keterangan);
    this.setUsername(username);
    this.events.publish('user:login');
    this.loginState = true;
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('token');
    this.storage.remove('id');
    this.storage.remove('keterangan');
    this.events.publish('user:logout');
    this.loginState = false;
    // location.reload();
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getID() {
     this.storage.get('id').then((res) => {
        this.ids = res;
        return this.ids;
     });
  }

  getToken() {
   this.storage.get('token').then((val) => {
      this.token = val;
    });

   return this.token;
    
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getKeterangan() {
    return this.storage.get('keterangan').then((value) => {
      return value;
    });
  }

  // return a promise
  // hasLoggedIn(val = this.getToken()) {
  //   this.jwt = val;
  //   this.input = JSON.stringify({jwtToken: this.jwt});

  //   this.http.post('http://cybex.ipb.ac.id/test/check.php', this.input).subscribe((ret) => {
  //     this.out = ret.json();
  //     if(this.out.status){
  //       this.loginState = true;
  //     }else{
  //       this.loginState = false;
  //     }
  //   });
  // }
}
