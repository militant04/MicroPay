import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  userDetails : any;
  // userDetails : any;
  responseData: any;
  // userPostData = {"user_id":"","token":""};
  // id :any;
  userData : any;
  list = [];


  constructor(public navCtrl: NavController,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    const trans = JSON.parse(localStorage.getItem('Transactions'));

    // this.getListOfTransactions();


      this.list =trans.transactions;
      //  console.log(trans.transactions);
      this.userData ={"clientID": data.userData.user_id};
      this.userDetails = data.userData;
      this.getListOfTransactions();



  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getListOfTransactions(){
    this.authService.postData(this.userData,'transactions').then((result) => {
      this.responseData = result;
      console.log(result);
      if(this.responseData.transactions){

        console.log(this.responseData);
        localStorage.setItem('Transactions', JSON.stringify(this.responseData));
      }
      else{ console.log("User already exists");
        alert('Login Failed - Wrong Credentials');
      }
    }, (err) => {
      alert('Login Failed - Network Error');
    });
  }



}
