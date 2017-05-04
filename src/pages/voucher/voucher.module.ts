import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Voucher } from './voucher';

@NgModule({
  declarations: [
    Voucher,
  ],
  imports: [
    IonicPageModule.forChild(Voucher),
  ],
  exports: [
    Voucher
  ]
})
export class VoucherModule {}
