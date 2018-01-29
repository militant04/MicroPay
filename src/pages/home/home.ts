import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service"
import { AlertController } from 'ionic-angular';


@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
 qrData = null;
 createdCode = null;
 scannedCode = null;
 merchantData = null;
 paymentData = {"clientID":"","amount":"92","merchantID":"wee"};
 responseData: any;
 // paymentDetails: any;
  userDetails : any;


 constructor(public alertCtrl: AlertController,private barcodeScanner: BarcodeScanner, public authService:AuthServiceProvider) {
   const data = JSON.parse(localStorage.getItem('userData'));
   this.userDetails = data.userData;
      console.log(this.userDetails);
      // console.log(this.userDetails);
     this.paymentData.clientID = this.userDetails.user_id;
     // this.paymentData.amount = this.userDetails.amount;
     // this.paymentData.merchantID = this.userDetails.merch_name;
 }

 createCode() {
   this.createdCode = this.qrData;
 }


 scanCode() {
   this.barcodeScanner.scan().then(barcodeData => {
     let jsondata = barcodeData.text;
     this.scannedCode = jsondata;
     this.merchantData = JSON.parse(jsondata);
     document.getElementById('butt').style.display='none';
   }, (err) => {
       console.log('Error: ', err);
   });
 }
 pay(){
    // this.presentLoading();
    this.authService.makePayment(this.paymentData,'pay').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      let responseType = this.responseData.ResponseData.confirmed;
      if(this.responseData.ResponseData){
         switch (responseType){
           case 'true':
             // alert('payment has been processed');
             this.showAlert('payment has been processed');
             break;
           case 'false':
             this.showAlert('You have insufficient credit to perform transaction');
             // alert('You have insufficient credit to perform transaction');
             break;

         }

        // console.log(this.responseData);
        // alert('payment processed');
        // localStorage.setItem('paymentData', JSON.stringify(this.responseData));
        // this.navCtrl.push(TabsPage);
      }
      else{ console.log("User already exists");
        alert('payment failed');
        // this.showToast('bottom','Login Failed - Wrong Credentials');
      }
    }, (err) => {
      // this.showToast('bottom', 'Login Failed - Network Error');
    });



  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


}


