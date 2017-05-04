import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchUser } from './search-user';

@NgModule({
  declarations: [
    SearchUser,
  ],
  imports: [
    IonicPageModule.forChild(SearchUser),
  ],
  exports: [
    SearchUser
  ]
})
export class SearchUserModule {}
