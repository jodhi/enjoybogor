import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Intro } from '../pages/intro/intro';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Home } from '../pages/home/home';
import { Discover } from '../pages/discover/discover';
import { Search } from '../pages/search/search';
import { Voucher } from '../pages/voucher/voucher';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    Intro,
    Login,
    Register,
    MyApp,
    Home,
    Discover,
    Search,
    Voucher
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Intro,
    Login,
    Register,
    MyApp,
    Home,
    Discover,
    Search,
    Voucher
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
