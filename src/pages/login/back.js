"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var tabs_1 = require("../tabs/tabs");
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(http, navCtrl, navParams) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = { "username": "militant", "password": "militant", "email": "srpiobhnavas@gmail.com", "name": "Militant Saungweme" };
        this.data = {};
        this.data.username = '';
        this.data.response = '';
        this.http = http;
    }
    LoginPage.prototype.submit = function () {
        var link = 'http://localhost:81/micropay/api/login';
        var myData = JSON.stringify(this.userData);
        //using fetch method
        console.log(myData);
        fetch(link, {
            mode: 'no-cors',
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData)
        }).then(function (res) { return res; })
            .then(function (res) { return console.log(res); });
        // this.http.post(link, myData)
        //   .subscribe(data => {
        //     this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
        //   }, error => {
        //     console.log("Oooops!");
        //   });
    };
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad LoginPage');
    // }
    LoginPage.prototype.move = function () {
        this.navCtrl.push(tabs_1.TabsPage);
    };
    LoginPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;






