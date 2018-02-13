import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import {EssentialsPage} from "../essentials/essentials";
import {CallNumber} from "@ionic-native/call-number"

/**
 * Generated class for the ExtrasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-extras',
  templateUrl: 'extras.html',
})
export class ExtrasPage {

  constructor(public callNumber: CallNumber,public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(EssentialsPage);
    popover.present({ ev: myEvent });
  }
  sendMoney(){
    this.callNumber.callNumber("*151*1*1#", true)
  }

}
