import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public lineChartData:Array<any> = [
    {data: [2, 2, 5.40, 3.80, 4, 0, 20],label: 'Weekly Spending'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['Mon', '', '', '', '', '', 'Sun'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: '#45758c',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fff'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  // public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  userDetails : any;
  // userDetails : any;
  responseData: any;
  // userPostData = {"user_id":"","token":""};
  // id :any;
  userData : any;
  list = [];


  constructor(public navCtrl: NavController,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    const trans = JSON.parse(localStorage.getItem('Transactions'));

    if(trans!=null){
      this.list =trans.transactions;
       console.log(trans.transactions);
      this.userData ={"clientID": data.userData.user_id};
      this.userDetails = data.userData;
      this.getListOfTransactions();
     }
    // else{
    //   // alert('Trans is null');
    // }

    // this.id =data.userData.user_id;



  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getListOfTransactions(){
    this.authService.postData(this.userData,'transactions').then((result) => {
      this.responseData = result;
      console.log(result);
      if(this.responseData.transactions){

        console.log(this.responseData);
        localStorage.setItem('Transactions', JSON.stringify(this.responseData));
      }
      else{ console.log("User already exists");
        alert('Login Failed - Wrong Credentials');
      }
    }, (err) => {
      alert('Login Failed - Network Error');
    });
  }



}
