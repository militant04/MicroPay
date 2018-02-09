import { Component } from '@angular/core';
import {  NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
// import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SignupPage} from "../signup/signup";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // userDetails : any;
  responseData: any;
  // userPostData = {"user_id":"","token":""};

  userData = {"username": "","password": ""};


  constructor(public loadingCtrl: LoadingController,public toastCtrl: ToastController,public navCtrl: NavController, public authService:AuthServiceProvider ) {

    // const data = JSON.parse(localStorage.getItem('userData'));
    // this.userDetails = data.userData;
    // this.userPostData.user_id = this.userDetails.user_id;
    // this.userPostData.token = this.userDetails.token;
    // console.log(this.userDetails);

    // if(this.userDetails.username !== null){
    //     this.moveToTabs();
    // }
    // else {
    //   console.log('d svdsdvs');
    // }


  }



  //control loading on login
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading your data, please wait...",
      duration: 3000
    });
    loader.present();
  }


  //Toast Button to indicate wrong login
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
  signup(){
    this.presentLoading();
    this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.userData){

        console.log(this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
      }
      else{ console.log("User already exists");
        this.showToast('bottom','Login Failed - Wrong Credentials');
      }
    }, (err) => {
         this.showToast('bottom', 'Login Failed - Network Error');
    });



  }

  login(){
    //Login page link
    this.navCtrl.push(SignupPage);
  }
}
