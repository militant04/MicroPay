import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  activity = 'in';
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.activity='in';
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

}
