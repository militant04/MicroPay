import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import {Http } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AuthServiceProvider} from '../providers/auth-service/auth-service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {WelcomePage} from "../pages/welcome/welcome";
import {CardIO} from '@ionic-native/card-io';
import {TransactionsPage} from "../pages/transactions/transactions"
import {SignupPage} from "../pages/signup/signup";
import {AddCardPage} from "../pages/add-card/add-card";
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import {ModalPage} from "../pages/modal/modal";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { CallNumber } from '@ionic-native/call-number';
import { ExtrasPage} from "../pages/extras/extras";
import {EssentialsPage} from "../pages/essentials/essentials";
import { ChartsModule } from 'ng2-charts';
import {CryptoJS} from 'crypto-js';





@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,EssentialsPage,
    SignupPage,ModalPage,
    TransactionsPage,AddCardPage,ExtrasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,HttpModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,ExtrasPage,
    TransactionsPage,EssentialsPage,
    WelcomePage,SignupPage,AddCardPage,ModalPage

  ],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},AuthServiceProvider,
    BarcodeScanner, CardIO, HttpClient,NativePageTransitions,CallNumber

  ]
})
export class AppModule {}
