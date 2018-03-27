import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service"
import { AlertController } from 'ionic-angular';
import {NavController} from "ionic-angular";
import {AboutPage} from "../about/about";
import CryptoJS from 'crypto-js';



@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
 qrData = null;
 createdCode = null;
 scannedCode = null;
 merchantData = null;
 paymentData = {"clientID":"12", "amount":"3.23","merchantID":"3","merchantName": ""};
 responseData: any;
 // paymentDetails: any;
  userDetails : any;

  clientID: any;


 constructor(public alertCtrl: AlertController,
             private barcodeScanner: BarcodeScanner,
             public authService:AuthServiceProvider,public navCtrl: NavController) {
   const data = JSON.parse(localStorage.getItem('userData'));
   this.userDetails = data.userData;
      console.log(this.userDetails);
      // To do tommorow--Try saving the state of amount in localStorage
      this.paymentData.clientID = this.userDetails.user_id;
      this.paymentData.amount = localStorage.getItem('Amount');
      this.paymentData.merchantID = localStorage.getItem('MerchID');
      this.paymentData.merchantName = localStorage.getItem('MerchName');
 }

 createCode() {
   this.createdCode = this.qrData;
 }


 scanCode() {
   //
   // let jsondata = 'U2FsdGVkX19vJv3DUwSMDqyOXgcPFPn6LXanhn+QnvgoDxaiQ70Tj2CJ5yc7HIJoWe2uJONQK83w8XlKjp+3NEmAb0ROGK3Ab4pBs0XeefP7Q/GRldvU73xOySfC4HSYqmrS35PIf1fSZjpQ4mGNQg=='
   // let bytes  = CryptoJS.AES.decrypt(jsondata, 'secret key 123');
   // let plaintext = bytes.toString(CryptoJS.enc.Utf8);
   // console.log(plaintext);
   // this.scannedCode = jsondata;
   // this.merchantData = JSON.parse(plaintext);
   // let merchData =JSON.parse(jsondata);
   // console.log(merchData);
   this.barcodeScanner.scan().then(barcodeData => {

     document.getElementById('butt').style.display='none';
     let jsondata = barcodeData.text;
     // let jsondata = 'U2FsdGVkX19vJv3DUwSMDqyOXgcPFPn6LXanhn+QnvgoDxaiQ70Tj2CJ5yc7HIJoWe2uJONQK83w8XlKjp+3NEmAb0ROGK3Ab4pBs0XeefP7Q/GRldvU73xOySfC4HSYqmrS35PIf1fSZjpQ4mGNQg=='
     let bytes  = CryptoJS.AES.decrypt(jsondata, 'secret key 123');
     let plaintext = bytes.toString(CryptoJS.enc.Utf8);
     console.log(plaintext);
     this.scannedCode = jsondata;
     this.merchantData = JSON.parse(plaintext);
     let merchData =JSON.parse(jsondata);
     // this.showAlert(merchData.MerchantData.amount);
     localStorage.setItem('MerchName', merchData.MerchantData.merch_name);
     localStorage.setItem('Amount', merchData.MerchantData.amount);
     localStorage.setItem('MerchID', merchData.MerchantData.merch_id);
     this.paymentData.amount = merchData.MerchantData.amount;
     this.paymentData.merchantName = merchData.MerchantData.merch_name;
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
           case 'True':
             // alert('payment has been processed');
             this.showAlert('payment has been processed');
             this.navCtrl.setRoot(AboutPage);
             this.navCtrl.popToRoot();

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


