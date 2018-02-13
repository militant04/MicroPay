import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {TransactionsPage} from "../transactions/transactions"
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {NavController} from "ionic-angular"
import {ExtrasPage} from "../extras/extras";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = TransactionsPage;
  tab5Root = ExtrasPage;



  constructor( public navCtrl: NavController) {

  }
}
