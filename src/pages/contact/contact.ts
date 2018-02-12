import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { CardIO, CardIOOptions } from '@ionic-native/card-io';
import { AuthServiceProvider} from "../../providers/auth-service/auth-service"
import { PopoverController } from 'ionic-angular';
import {AddCardPage} from "../../pages/add-card/add-card";
import {ModalPage} from "../modal/modal";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //this part handles extrction of data from local storage
  userDetails : any;
  responseData: any;
  userPostData = {"user_id":"","token":""};
  myAcc = null;
  bank = null;

  scannedCardNumber = null;
  //refresher
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController,private cardIO: CardIO, public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;


    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.myAcc = localStorage.getItem('accountNumber');
    this.bank = localStorage.getItem('bankName');


  }

  extractCardInfo(){
    this.myAcc = localStorage.getItem('accountNumber');
    this.bank = localStorage.getItem('bankName');

  }

  presentPopover() {
    let popover = this.popoverCtrl.create(ModalPage);
    popover.present();
  }
  backToWelcome(){
    this.navCtrl.push(LoginPage);
  }

  logout(){
    localStorage.clear();

  }




  login(){
    this.navCtrl.push(LoginPage);
  }

  model = {
    cardType: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    expireDate: ''
  }

  carNumber: string = '';
  expireDate: string = '';


  setCardData(data: any) {
    this.model.cardType = data.cardType;
    this.model.cardholderName = data.cardholderName;
    this.model.cardNumber = data.cardNumber;
    this.model.expiryMonth = data.expiryMonth;
    this.model.expiryYear = data.expiryYear;
    this.model.expireDate = data.expiryMonth +"/"+ data.expiryYear;
  }

  scanButton() {

    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if(res){
            let options = {
              requireExpiry: true,
              requireCardholderName: true,
              scanExpiry: true
            };
            return this.cardIO.scan(options);
          }
        }
      )
      .then(res => {
        console.log(res);
        this.scannedCardNumber = res.cardNumber;
        this.setCardData(res);
      }, err => {
        alert(err);
        console.log(err);
      });
  }

  // move to add card
  moveToAddCard(){
    this.navCtrl.push(AddCardPage);
  }



}
