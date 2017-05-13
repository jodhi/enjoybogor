import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
import { Http } from '@angular/http';

import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AboutPage } from '../pages/about/about';

import { UserData } from '../providers/user-data';
import { Storage } from '@ionic/storage';

export interface PageObj {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  public out;
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Berita', component: TabsPage, icon: 'paper' },
    { title: 'Diskusi', component: TabsPage, index: 1, icon: 'people' },
    { title: 'Artikel', component: TabsPage, index: 2, icon: 'book' },
    { title: 'Cari', component: TabsPage, index: 3, icon: 'search' },
    // { title: 'About', component: TabsPage, index: 3, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Akun Saya', component: AccountPage, icon: 'person' },
    { title: 'Keluar', component: TabsPage, icon: 'log-out', logsOut: true },
    { title: 'Tentang', component: AboutPage, icon: 'information-circle' },
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Daftar', component: SignupPage, icon: 'person-add' },
    { title: 'Tentang', component: AboutPage, icon: 'information-circle' }
  ];
  rootPage: any = TabsPage;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public storage: Storage,
    public http: Http,
    platform: Platform
  ) {

    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.storage.get('didTutorial').then((result)=>{
        if(result){
          this.rootPage = TabsPage;
        }else{
          this.rootPage = TutorialPage;
          this.storage.set('didTutorial', true);
        }
      });
    });

    // decide which menu items should be hidden by current login status stored in local storage
    // this.userData.hasLoggedIn().then((hasLoggedIn) => {
    //   this.enableMenu(hasLoggedIn === true);
    // });
    this.storage.get('token').then((val) => {
      var creds = JSON.stringify({jwtToken: val});
      // console.log(creds+" --- "+val);
      this.http.post('http://cybex.ipb.ac.id/test/check.php', creds).subscribe((ret) => {
        this.out = ret.json();
        if(this.out.status){
          this.events.publish('user:login');
          // this.enableMenu(true);
        }
      });
      
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.userData.loginState = true;
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
