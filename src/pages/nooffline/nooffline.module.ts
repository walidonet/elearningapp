import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoofflinePage } from './nooffline';

@NgModule({
  declarations: [
    NoofflinePage,
  ],
  imports: [
    IonicPageModule.forChild(NoofflinePage),
  ],
})
export class NoofflinePageModule {}
