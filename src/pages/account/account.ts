import { Component } from '@angular/core';

import { AlertController, NavController,LoadingController ,ToastController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';

import { Http } from '@angular/http';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  name: string;
  email: string;
  contact: string;
  points: number;
  id: string;
  image_path: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData, public http: Http, public loadCtrl: LoadingController,public toastCtrl: ToastController) {
    this.userData.getID().then((id) => {
      this.id = id;
      this.getInfo();
    });
  }

  ngAfterViewInit() {
    this.getInfo();
  }

  ionViewWillEnter() {
    this.getInfo();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getInfo();
      refresher.complete();
    }, 1500);
  }

getInfo(){
  let creds = JSON.stringify({user_id: this.id  });
  let loading = this.loadCtrl.create({
      content: 'Checking...'
  });
  this.http.post('http://localhost/enjoybogor-backend/api/account.php', creds).subscribe(res => {
    let response = res.json();

    console.log(response['status']);
    loading.dismiss();
    if (response['status']){


        this.userData.setId(response['id']);
        this.userData.login(response['username'], response['name'],response['contact'],response['email'],response['points']);
        this.name = response['name'];
        this.points = response['points'];
        this.email = response['email'];
        this.contact = response['contact'];
        this.username = response['username'];
        this.image_path = response['image'];

    }


  });
}

check_password(data){
  let data_send = JSON.stringify({username: this.username, password: data, control: 'check' });
  this.http.post('http://localhost/enjoybogor-backend/api/edit_password.php', data_send).subscribe(res => {
    let response = res.json();
    if (response['status']=='success'){
      console.log("success check password");
      this.prompt_password2();
    }else{
      this.showToastFail();
    }

  });
}
update_password(data){
  let data_send = JSON.stringify({ password: data,user_id: this.id , control: 'update' });
  this.http.post('http://localhost/enjoybogor-backend/api/edit_password.php', data_send).subscribe(res => {
    let response = res.json();
    if (response['status']=='success'){
      console.log("success update");
      this.showToast();
    }
  });
}
process_profile(data,type){
  let data_send = JSON.stringify({username: this.username, user_contact: this.contact, email: this.email, user_id: this.id , user_name: this.name  });

  if(type=="username"){
   data_send = JSON.stringify({username: data, user_contact: this.contact, email: this.email, user_id: this.id , user_name: this.name  });
}else if(type=="name"){
  data_send = JSON.stringify({username: this.username, user_contact: this.contact, email: this.email, user_id: this.id , user_name: data  });
}else if(type=="email"){
    data_send = JSON.stringify({username: this.username, user_contact: this.contact, email: data, user_id: this.id , user_name: this.name  });
}else if(type=="contact"){
  data_send = JSON.stringify({username: this.username, user_contact: data, email: this.email, user_id: this.id , user_name: this.name  });
}

  console.log(data_send);
  this.http.post('http://localhost/enjoybogor-backend/api/edit_profile.php', data_send).subscribe(res => {
    let response = res.json();
  //  console.log(response['status']);
    if (response['status']){
      this.getInfo();
      console.log("success");
      this.showToast();
    }

  });
}
edit_profile(field){
  if(field=='username'){
    this.prompt_username();
  }else if(field=='name'){
    this.prompt_name();
  }else if(field=='email'){
    this.prompt_email();
  }else if(field=='contact'){
    this.prompt_contact();
  }else if(field=='password'){
    this.prompt_password();
  }
}
edit_photo(){

}

prompt_password() {
  let prompt = this.alertCtrl.create({
    title: 'Change Password',
    message: 'Please enter your old password',
    inputs: [
      {
        type:"password",
        name: 'password',
        placeholder: 'Old Password',
      },
    ],
    buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},{
        text: 'Confirm',
        handler: data => {
          console.log('Saved clicked');
          this.check_password(data['password']);
        }}]});
  prompt.present();
}
prompt_password2() {
  let prompt = this.alertCtrl.create({
    title: 'Change Password',
    message: 'Please enter new password',
    inputs: [
      {
        type:"password",
        name: 'password',
        placeholder: 'New Password',
      },
    ],
    buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},{
        text: 'Confirm',
        handler: data => {
          console.log('Saved clicked');
          this.update_password(data['password']);
        }}]});
  prompt.present();
}
prompt_username() {
  let prompt = this.alertCtrl.create({
    title: 'Edit Username',
    inputs: [
      {
        type:"text",
        name: 'username',
        placeholder: this.username,
      },
    ],
    buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},{
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
          console.log(data['username']);
          this.process_profile(data['username'],"username");
        }}]});
  prompt.present();
}

prompt_name() {
  let prompt = this.alertCtrl.create({
    title: 'Edit Name',
    inputs: [{
        type:"text",
        name: 'name',
        placeholder: this.name,
      },],
    buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},{
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
          console.log(data['name']);
          this.process_profile(data['name'],"name");
        }}
    ]
  });
  prompt.present();
}

prompt_email() {
  let prompt = this.alertCtrl.create({
    title: 'Edit Email',
    inputs: [{
        type:"email",
        name: 'email',
        placeholder: this.email,
      },],
    buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},{
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
          console.log(data['email']);
          this.process_profile(data['email'],"email");
        }}
    ]
  });
  prompt.present();
}
prompt_contact() {
  let prompt = this.alertCtrl.create({
    title: 'Edit Contact',
    inputs: [{
        type:"number",
        name: 'contact',
        placeholder: this.contact,
      },],
    buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},{
        text: 'Save',
        handler: data => {
          console.log('Saved clicked');
          console.log(data['contact']);
          this.process_profile(data['contact'],"contact");
        }}
    ]
  });
  prompt.present();
}

showToast(){
    let toast = this.toastCtrl.create({
      message: 'Success edit data',
      duration: 3500,
      position: 'top'
    });
    toast.present();

}
showToastFail(){
    let toast = this.toastCtrl.create({
      message: 'Wrong Password',
      duration: 3500,
      position: 'top'
    });
    toast.present();

}
  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }
}
