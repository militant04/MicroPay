import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalController } from 'ionic-angular';

@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
 qrData = null;
 createdCode = null;
 scannedCode = null;
 merchantData = null;

 constructor(private barcodeScanner: BarcodeScanner) { }

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

}
