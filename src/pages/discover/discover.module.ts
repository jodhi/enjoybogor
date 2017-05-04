import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Discover } from './discover';

@NgModule({
  declarations: [
    Discover,
  ],
  imports: [
    IonicPageModule.forChild(Discover),
  ],
  exports: [
    Discover
  ]
})
export class DiscoverModule {}
