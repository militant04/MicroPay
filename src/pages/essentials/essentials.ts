import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CallNumber} from "@ionic-native/call-number";


/**
 * Generated class for the EssentialsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-essentials',
  templateUrl: 'essentials.html',
})
export class EssentialsPage {

  constructor(private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EssentialsPage');
  }



}
