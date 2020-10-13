import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, ModalController} from 'ionic-angular';
import { File } from '@ionic-native/file';
import {Platform} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

/**
 * Generated class for the NoofflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-nooffline',
  templateUrl: 'nooffline.html',
})
export class NoofflinePage implements OnInit {

  storageDirectory
  loadFiles=[]
  is_playing: boolean
  is_detail: boolean
  profilePage=ProfilePage;
  isLoggedIn:false;
  filename='';
  duration: any = -1;
  position: any = 0;
  get_duration_interval: any;
  get_position_interval: any;
  source;
  sources;
  bo_html5;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public platform: Platform,  private file: File,private toastCtrl: ToastController,
    public modalCtrl:ModalController,private sanitizer: DomSanitizer) {
      
  }
  ngOnInit(): void {
    this.bo_html5=false
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
  
 
 
 

 
  opendetail(f){
    this.filename=f.name
    this.is_detail=true
    this.bo_html5=true
    this.source = 'init';
    this.sources = 'init';
    this.file.checkFile(this.storageDirectory, this.filename).then((correct : boolean) => {
      if(correct){
          this.file.readAsDataURL(this.storageDirectory,  this.filename).then((base64) => {
              this.source = '(base64)';
              this.sources = this.sanitizer.bypassSecurityTrustUrl(base64);
              this.bo_html5 = true;
              let toast = this.toastCtrl.create({
                message: this.source,
                duration: 5000,
                position: 'bottom'
              });
              toast.present();
          }).catch((err) => {
            let toast = this.toastCtrl.create({
              message:"VIDEO :: No se pudo recuperar el video",
              duration: 5000,
              position: 'bottom'
            });
            toast.present();
              console.log("VIDEO :: No se pudo recuperar el video");
              console.log(err);
          });
      } else {
        this.source='else'
        let toast = this.toastCtrl.create({
          message:"VIDEO :: El video no pudo ser encontrado",
          duration: 5000,
          position: 'bottom'
        });
        toast.present();
          console.log("VIDEO :: El video no pudo ser encontrado");
      }
    }).catch((err) => {
      this.source='catch'
        console.log("VIDEO :: Ocurrio un error al verificar si el video existe");
        console.log(err);
    });
    
     
  }
  closedetail(f){
    this.filename=''
    this.source=''
    this.sources=''
    this.bo_html5 = false;
    this.is_detail=false
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
  }

}
