import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigUser } from './config-user';

@NgModule({
  declarations: [
    ConfigUser,
  ],
  imports: [
    IonicPageModule.forChild(ConfigUser),
  ],
  exports: [
    ConfigUser
  ]
})
export class ConfigUserModule {}
