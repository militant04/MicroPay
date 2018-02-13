import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EssentialsPage } from './essentials';

@NgModule({
  declarations: [
    EssentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(EssentialsPage),
  ],
})
export class EssentialsPageModule {}
