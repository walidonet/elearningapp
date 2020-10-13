import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodataPage } from './nodata';

@NgModule({
  declarations: [
    NodataPage,
  ],
  imports: [
    IonicPageModule.forChild(NodataPage),
  ],
})
export class NodataPageModule {}
