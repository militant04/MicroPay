import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardIO} from "@ionic-native/card-io";

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

  constructor(public navCtrl: NavController,private cardIO: CardIO, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardPage');
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

}
