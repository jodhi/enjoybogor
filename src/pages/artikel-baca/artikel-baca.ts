import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { LocationPage } from '../location/location';
import { TulisKomentarPage } from '../tulis-komentar/tulis-komentar';
import { AddMenuPage } from '../add-menu/add-menu';
import 'rxjs/add/operator/map';
/*
  Generated class for the ArtikelBaca page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-artikel-baca',
  templateUrl: 'artikel-baca.html'
})
export class ArtikelBacaPage {
  public id: any;
  public posts: any;
  public posts_comment: any;
  public posts_menu: any;
  public comments: any;
  public sharePic;
  public nodata=false;
public nodata_comment=false;
public nodata_menu=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,public http: Http,public userData: UserData) {
    this.id = navParams.data;
    //console.log(this.id);
    this.getData();
    this.getCommentData();
    this.getMenuData();
  }

  islogin(){
    if(this.userData.loginState){
      return true;
    }else{
      return false;
    }
  }

  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/detail_restaurant.php?id='+this.id).map(res => res.json()).subscribe(data => {
        this.posts = data;
    });
  }

  getCommentData() {
    this.http.post("http://localhost/enjoybogor-backend/api/show_comment.php",{restaurant_id:this.id}).subscribe(res => {

      console.log(res);
      this.nodata_comment=false;
      this.posts_comment = res.json();
      if(this.posts_comment['status']=="nodata"){
        this.nodata_comment=true;
        console.log("nodata comment true");
      }
      console.log("dapat comment ");
    }
    );
  }

  getMenuData() {
    this.http.post("http://localhost/enjoybogor-backend/api/show_menu.php",{restaurant_id:this.id}).subscribe(res => {

      console.log(res);
      this.nodata_menu=false;
      this.posts_menu = res.json();
      if(this.posts_menu['status']=="nodata"){
        this.nodata_menu=true;
        console.log("nodata menu true");
      }
      console.log("dapat data menu");
    }
    );
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      this.getCommentData();
      this.getMenuData();
      refresher.complete();
    }, 1500);
  }

  ionViewWillEnter() {
    this.getData();
    this.getCommentData();
    this.getMenuData();
  }

show_location(address){
  this.navCtrl.push(LocationPage,address);
}

   presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Choice',
        buttons: [
          {
            text: 'Give Comment',
            role: 'comment',
            handler: () => {
              console.log('Add comment clicked');
              this.navCtrl.push(TulisKomentarPage, this.id);
            }
          },{
            text: 'Add Menu',
            role: 'add_menu',
            handler: () => {
              console.log('Add menu clicked');
              this.navCtrl.push(AddMenuPage, this.id);
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

}
