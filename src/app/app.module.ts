import { NgModule } from '@angular/core';
import { Ng2UploaderModule } from 'ng2-uploader';
import { IonicApp, IonicModule } from 'ionic-angular';
// import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import { MyvoucherPage } from '../pages/myvoucher/myvoucher';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AddMenuPage } from '../pages/add-menu/add-menu';
import { UserData } from '../providers/user-data';

import { LocationPage } from '../pages/location/location';
import { ArtikelPage } from '../pages/artikel/artikel';
import { CariPage } from '../pages/cari/cari';
import { DiskusiPage } from '../pages/diskusi/diskusi';
import { ArtikelBacaPage } from '../pages/artikel-baca/artikel-baca';
import { TulisArtikelPage } from '../pages/tulis-artikel/tulis-artikel';
import { TulisDiskusiPage } from '../pages/tulis-diskusi/tulis-diskusi';
import { TulisKomentarPage } from '../pages/tulis-komentar/tulis-komentar';
import { HomePage } from '../pages/home/home';
import { VoucherDetailPage } from '../pages/voucher-detail/voucher-detail';
import { AddphotoPage } from '../pages/addphoto/addphoto';

@NgModule({
  declarations: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    ArtikelPage,
    CariPage,
    DiskusiPage,
    ArtikelBacaPage,
    TulisArtikelPage,
    TulisDiskusiPage,
    TulisKomentarPage,
    HomePage,
    VoucherDetailPage,
    MyvoucherPage,
    AddMenuPage,
    LocationPage,
    AddphotoPage,
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp, {
      tabsPlacement: 'top',
      tabsHideOnSubPages: 'true',
      mode: 'ios',
    }),
    Ng2UploaderModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    ArtikelPage,
    CariPage,
    DiskusiPage,
    ArtikelBacaPage,
    TulisArtikelPage,
    TulisDiskusiPage,
    TulisKomentarPage,
    HomePage,
    VoucherDetailPage,
    MyvoucherPage,
    AddMenuPage,
    LocationPage,
    AddphotoPage,
  ],
  providers: [Storage, UserData]
})
export class AppModule {}
