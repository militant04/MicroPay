import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = 'http://enter10ment.co.zw/api/';
// let apiUrl = 'http://localhost:81/micropay/api/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI
*/
@Injectable()
export class AuthServiceProvider {


  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json);
        }, (err) => {
          console.log(err);
          reject(err);

        });
    });

  }
  makePayment(paymentPayload, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(paymentPayload), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });

  }


}
