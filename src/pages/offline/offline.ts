import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, ModalController} from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {Platform} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the OfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage implements OnInit {
  storageDirectory
  loadFiles=[]
  is_playing: boolean
  is_detail: boolean
  mediafile : MediaObject;
  profilePage=ProfilePage;
  isLoggedIn:false;
  filename='';
  duration: any = -1;
  position: any = 0;
  get_duration_interval: any;
  get_position_interval: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private media : Media
    , public platform: Platform,  private file: File,private toastCtrl: ToastController,
    public modalCtrl:ModalController,) {
      
  }
  ngOnInit(): void {
    this.is_playing=false
    this.is_detail=false
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
          this.loadFiles.push(element)
        }
      });
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
        return error
      }
      
    }
  }
  getMediaDuration(audio): Promise<any> {
    return new Promise((resolve, reject) => {
      audio.seekTo(1);
      audio.onStatusUpdate.subscribe(status => {
        setTimeout(()=>{
          resolve(audio.getDuration());
          audio.release();
        }, 500);

      }); 
    });
  }
  interval
  playRecording(){
    //let mediaobject :MediaObject = this.createAudioFile(this.storageDirectory,f.name)
    
    this.is_playing=true
    this.mediafile.play();
     this.getMediaDuration(this.mediafile).then(rslt=>this.duration=rslt)
    this.position=0
   setInterval(function(){
    //this.duration = this.mediafile.getDuration
    this.position=this.position+1;
    //this.mediafile.seekTo(this.position*1000)
  
  }.bind(this), 1000);
    
  }
  changepostion(){
    //this.mediafile.seekTo(this.position*1000)
    let toast = this.toastCtrl.create({
      message: 'res.message',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }
  updateSongPosition(event){
    this.mediafile.seekTo(this.position*1000)
  }
  pausePlayRecording() {
    this.is_playing=false
    //let mediaobject :MediaObject = this.createAudioFile(this.storageDirectory,f.name)
    this.mediafile.pause();
  }
 
  opendetail(f){
    this.filename=f.name
    this.is_detail=true
    this.mediafile= this.createAudioFile(this.storageDirectory,f.name)
    this.duration= this.mediafile.getDuration()*1000
    
      let toast = this.toastCtrl.create({
          message: this.duration,
          duration: 1000,
          position: 'bottom'
      });
      toast.present();
  }
  closedetail(f){
    this.filename=''
    this.mediafile.stop()
    this.mediafile=null
    this.is_detail=false
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
  }

}
