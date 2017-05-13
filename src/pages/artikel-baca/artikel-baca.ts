import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';

import { TulisKomentarPage } from '../tulis-komentar/tulis-komentar';
import { SocialSharing } from 'ionic-native';
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
  public comments: any;
  public sharePic;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public userData: UserData) {
    this.id = navParams.data;
    //console.log(this.id);
    this.getData();
  }

  islogin(){
    if(this.userData.loginState){
      return true;
    }else{
      return false;
    }
  }

  getData() {
    this.http.get('http://cybex.ipb.ac.id/api/artikel_b.php?idartikel='+this.id+'&share').map(res => res.json()).subscribe(data => {
        this.posts = data;

    });

    this.http.get('http://cybex.ipb.ac.id/api/comment.php?idartikel='+this.id).map(res => res.json()).subscribe(data => {
        this.comments = data;
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }

  ionViewWillEnter() {
    this.getData();
  }

  tulisKomentar() {
    this.navCtrl.push(TulisKomentarPage, this.id);
  }
 
  share() {
    console.log(this.posts);
    this.http.get('http://cybex.ipb.ac.id/api/artikel_b.php?share=1&idartikel='+this.id).map(res => res.json()).subscribe(data => {
        // this.posts = data;
    
        if (data.foto == null) {
          this.sharePic = null;
        }
        else {
          this.sharePic = 'http://cybex.ipb.ac.id/uploads/' + data.foto;
        }

        // console.log(data.nama_kategori+" "+data.judul_artikel);
        console.log('http://cybex.ipb.ac.id/index.php/artikel/detail/' + data.nama_kategori + '/' + this.id);
        SocialSharing.share(data.judul_artikel, 'Cybex IPB | ' + data.judul_artikel, this.sharePic, 'http://cybex.ipb.ac.id/index.php/artikel/detail/' + data.nama_kategori + '/' + this.id).then(() => {
          alert("Berhasil membagikan");
        }).catch(() => {
          alert("Batal membagikan");
        });
    });
  }
}