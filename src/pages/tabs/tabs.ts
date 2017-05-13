import { Component, ElementRef } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ArtikelPage } from '../artikel/artikel';
import { CariPage } from '../cari/cari';
import { DiskusiPage } from '../diskusi/diskusi';
import { BeritaPage } from '../berita/berita';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = BeritaPage;
  tab2Root: any = DiskusiPage;
  tab3Root: any = ArtikelPage;
  tab4Root: any = CariPage;
  mySelectedIndex: number;
  public ionScroll;

  constructor(navParams: NavParams, public myElement: ElementRef) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }


  // scrollTop(){
  // 	console.log("jalaaaaan!");

  // }

}
