import { Component } from '@angular/core';
import {  NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
// import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData = {"username": "","password": ""};

  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public authService:AuthServiceProvider ) {
  }


  //Toast Button to indicate wrong login
  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Your credentials are incorrect, Retry Login',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  signup(){
    this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.userData){
        console.log(this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
      }
      else{ console.log("User already exists");
        this.showToastWithCloseButton();
      }
    }, (err) => {
      // Error log
    });



  }

  // login(){
  //   //Login page link
  //   this.navCtrl.push(LoginPage);
  // }
}
