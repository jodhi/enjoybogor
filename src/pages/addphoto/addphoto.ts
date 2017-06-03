import { Component } from '@angular/core';
import { NavController ,ToastController,NavParams} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
/*
  Generated class for the Addphoto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addphoto',
  templateUrl: 'addphoto.html'
})
export class AddphotoPage {
  public restaurant_id:any;
  options: Object;
  constructor(public navCtrl: NavController,public navParams: NavParams, public toastCtrl: ToastController,public userData: UserData) {
    this.restaurant_id = navParams.data;
      this.getID();

  }

  getID(){
      this.options  ={
          url: 'http://localhost/enjoybogor-backend/api/tambah_foto.php',
          allowedExtensions: ['image/png', 'image/jpg','image/jpeg'] ,
          data:{
            restaurant_id: this.restaurant_id,
          }
      };

  }

  ionViewDidLoad() {
    console.log('Hello AddphotoPage Page');
  }

  //upload file
    uploadFile: any;

      sizeLimit = 2000000;


      handleUpload(data): void {
          console.log("success");
          this.showToast();
          this.navCtrl.pop();
      }



      beforeUpload(uploadingFile): void {
        if (uploadingFile.size < this.sizeLimit && (uploadingFile.originalName.indexOf('jpg') > -1 || uploadingFile.originalName.indexOf('jpeg') > -1 || uploadingFile.originalName.indexOf('png') > -1 ) )    {
            this.uploadFile = uploadingFile;
        }else{
        uploadingFile.setAbort();
        alert('File is too large or bad extension');
      }
      }

      showToast(){
          let toast = this.toastCtrl.create({
            message: 'Success add  photo',
            duration: 3500,
            position: 'top'
          });
          toast.present();

      }

}
