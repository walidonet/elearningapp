import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {Platform} from 'ionic-angular';

/**
 * Generated class for the NodataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-nodata',
  templateUrl: 'nodata.html',
})
export class NodataPage implements OnInit {

  storageDirectory
  loadFiles=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private media : Media
    , public platform: Platform,  private file: File,private toastCtrl: ToastController) {
  }
  ngOnInit(): void {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
      this.file.listDir(this.storageDirectory,'').then((listing) => {
      listing.forEach(element => {
        if(element.name.substr(element.name.length-3)=='mp3' || element.name.substr(element.name.length-3)=='mp4'){
          let mediaobject : MediaObject = this.createAudioFile(this.storageDirectory,element.name)
          this.loadFiles.push(mediaobject)
        }
      });
      let toastt1 = this.toastCtrl.create({
        message: this.loadFiles[0],
         duration: 10000,
        position: 'bottom'
      });
      toastt1.present()
      });
    });
  }
  createAudioFile(pathToDirectory, filename) {
    if (this.platform.is('ios')) {
      //ios
      return this.media.create(
        pathToDirectory.replace(/^file:\/\//, '') + '/' + filename
      );
    } else {
      // android
      try {
        return this.media.create(pathToDirectory + filename);
      } catch (error) {
        let toastt1 = this.toastCtrl.create({
          message: error,
           duration: 10000,
          position: 'bottom'
        });
        toastt1.present()
        return error
      }
      
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NodataPage');
  }

}
