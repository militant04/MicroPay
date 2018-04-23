import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AddCardPage} from "../add-card/add-card";


/**
 * Generated class for the SignupPage page.
 *
 * Page handles all signup activities
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // userDetails : any;
  responseData: any;
  // userPostData = {"user_id":"","token":""};

  userData = {"username": "","password": "", "name": "","email": ""};

  constructor(public loadingCtrl: LoadingController
              ,public authService: AuthServiceProvider
              ,public navCtrl: NavController
              ,public toastCtrl : ToastController
              ,public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
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
    this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.userData){

        console.log(this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(AddCardPage);
      }
      else{ console.log("User already exists");
        this.showToast('bottom','Login Failed - Wrong Credentials');
      }
    }, (err) => {
      this.showToast('bottom', 'Login Failed - Network Error');
    });



  }
  //control loading on login
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Registering Client..please wait",
      duration: 5000
    });
    loader.present();
  }
  login(){
    this.navCtrl.push(LoginPage);
  }


}
