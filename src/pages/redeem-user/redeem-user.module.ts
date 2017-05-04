import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedeemUser } from './redeem-user';

@NgModule({
  declarations: [
    RedeemUser,
  ],
  imports: [
    IonicPageModule.forChild(RedeemUser),
  ],
  exports: [
    RedeemUser
  ]
})
export class RedeemUserModule {}
