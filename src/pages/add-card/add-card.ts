import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardIO} from "@ionic-native/card-io";
import {ContactPage} from "../contact/contact";
import {TabsPage} from "../tabs/tabs";
import{AuthServiceProvider} from "../../providers/auth-service/auth-service";


/**
 * Generated class for the AddCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html',
})
export class AddCardPage {
  scannedCardNumber = null;
  accNumber = null;
  bank= null;
  userID =null;
  redactedCardNo = null;

  //create acc
  userDetails : any;
  responseData: any;

  // userPostData = {"user_id":"","token":""};
  userData = {"user_id": "","account": ""};

  constructor(public authService: AuthServiceProvider,public navCtrl: NavController,private cardIO: CardIO, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userID = this.userDetails.user_id;

  }

  saveCardDetails() {

    // localStorage.setItem('accountNumber', this.accNumber);
    // localStorage.setItem('bankName', this.bank);
    // this.authService.postData(this.userData,'account').then((result) => {
    //   this.responseData = result;
    //   console.log(this.responseData);
    //   if(this.responseData.responseData){
    //     console.log(this.responseData);
    //     // localStorage.setItem('userData', JSON.stringify(this.responseData));
    //     this.navCtrl.push(TabsPage);
    //   }
    //   else{
    //
    //     alert("User already exists");
    //
    //   }
    // }, (err) => {
    //
    // });

    localStorage.setItem('accountNumber', this.accNumber);
    localStorage.setItem('bankName', this.bank);
    localStorage.setItem('redCardNum', this.redactedCardNo);
    console.log(this.accNumber);
    console.log(this.bank);
    this.navCtrl.push(ContactPage);



  }
  model = {
    cardType: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    expireDate: '',
    redactedCardNumber: ''
  };

  carNumber: string = '';
  expireDate: string = '';


  setCardData(data: any) {
    this.model.cardType = data.cardType;
    this.model.cardholderName = data.cardholderName;
    this.model.cardNumber = data.cardNumber;
    this.model.expiryMonth = data.expiryMonth;
    this.model.redactedCardNumber = data.redactedCardNumber;
    this.model.expiryYear = data.expiryYear;
    this.model.expireDate = data.expiryMonth +"/"+ data.expiryYear;
    //save to local-storage

  }

  scanButton() {

    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if(res){
            let options = {
              requireExpiry: false,
              requireCardholderName: false,
              scanExpiry: true,
              keepApplicationTheme: true,
              guideColor: '#296d96'
            };
            return this.cardIO.scan(options);
          }
        }
      )
      .then(res => {
        console.log(res);
        this.scannedCardNumber = res.cardNumber;
        this.redactedCardNo = res.redactedCardNumber;
        alert(this.redactedCardNo);
        this.setCardData(res);
      }, err => {
        // alert(err);
        // console.log(err);
      });
  }

}
