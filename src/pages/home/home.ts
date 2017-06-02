import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { ArtikelBacaPage } from '../artikel-baca/artikel-baca';

// todo: refresh page get data;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data;
  public httpErr = false;

//upload file
  uploadFile: any;
  options: Object = {
      url: 'http://localhost:8100',
      allowedExtensions: ['image/png', 'image/jpg','image/jpeg'] ,
      // data:{restaurant_description: , restaurant_name: , restaurant_address: , restaurant_contact: , restaurant_category:}
  };
    sizeLimit = 2000000;

    handleUpload(data): void {
      console.log(data);
      // console.log(data.size);
      // if (data && data.response) {
        // data = JSON.parse(data.response);
        this.uploadFile = data;
      // }
    }

    // fileOverBase(e:any):void {
    //   this.hasBaseDropZoneOver = e;
    // }

    beforeUpload(uploadingFile): void {

      if (uploadingFile.size < this.sizeLimit && (uploadingFile.originalName.indexOf('jpg') > -1 || uploadingFile.originalName.indexOf('jpeg') > -1 || uploadingFile.originalName.indexOf('png') > -1 ) )    {

      }else{
      uploadingFile.setAbort();
      alert('File is too large or bad extension');
    }
    }

    test(){
      console.log(this.uploadFile);
    }

//end upload


  constructor(public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public userData: UserData) {
    this.getData();
  }

  ionViewDidLoad() {
  	// this.getData();
  }

  ionViewWillEnter() {
  }



  getData() {
    this.http.get('http://localhost/enjoybogor-backend/api/top3.php').subscribe(res => {
      this.data = res.json();
      console.log('dapet data restaurant');
      this.httpErr = false;
    }, err => {this.showAlert(err.status)});


  }

  baca(id_restaurant){
    this.navCtrl.push(ArtikelBacaPage, id_restaurant);
  }

  showAlert(status){
   if(status == 0){
     let toast = this.toastCtrl.create({
       message: 'No connection, Please check your internet connection',
       position: 'bottom',
       showCloseButton: true,
       closeButtonText: 'X'
     });
     toast.present();
   }else{
     let toast = this.toastCtrl.create({
       message: 'Cannot connect to server, please reload this page',
       position: 'bottom',
       showCloseButton: true,
       closeButtonText: 'X'
     });
     toast.present();
   }

   this.httpErr = true;
 }
}
