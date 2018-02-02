import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  userDetails : any;

  constructor(public navCtrl: NavController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

  }


}
