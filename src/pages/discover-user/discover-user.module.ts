import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscoverUser } from './discover-user';

@NgModule({
  declarations: [
    DiscoverUser,
  ],
  imports: [
    IonicPageModule.forChild(DiscoverUser),
  ],
  exports: [
    DiscoverUser
  ]
})
export class DiscoverUserModule {}
