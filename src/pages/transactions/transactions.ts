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
  // Doughnut
  public doughnutChartLabels:string[] = ['Monday', 'Tuesday', 'Wednesday'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  activity = 'in';
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.activity='in';
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

}
