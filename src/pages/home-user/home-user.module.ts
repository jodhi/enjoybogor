import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeUser } from './home-user';

@NgModule({
  declarations: [
    HomeUser,
  ],
  imports: [
    IonicPageModule.forChild(HomeUser),
  ],
  exports: [
    HomeUser
  ]
})
export class HomeUserModule {}
