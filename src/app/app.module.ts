import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {HttpModule} from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';

import { ionSlideTabs }   from '../components/swipedtab/swipedtab';
import { EmailValidatorDirective } from '../components/FormValidator';
import { LazyImgComponent }   from '../components/lazy-img/lazy-img';
import { LazyLoadDirective }   from '../directives/lazy-load.directive';
import { PressDirective }   from '../directives/longPress.directive';
import { PinchZoomDirective } from '../directives/pinch-zoom.directive';
import { ElasticDirective } from '../directives/elastic.directive';

import { ImgcacheService } from "../services/imageCache";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';   // for upload assignment file


import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
//End Social Logins

import { Intro } from '../pages/intro/intro';
import { MultiselectorPage } from '../pages/multiselector/multiselector';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { BlogPage } from '../pages/blog/blog';
import { PostPage } from '../pages/post/post';
import { BlogService } from '../services/blog';


import { UpdatesPage } from '../pages/updates/updates';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { WalletPage } from '../pages/wallet/wallet';
import { ChatPage } from '../pages/chat/chat';
import { MessagePage } from '../pages/message/message';
import { CoursePage } from '../pages/course/course';
import { CourseStatusPage } from '../pages/course-status/course-status';
import { ReviewCoursePage } from '../pages/reviewcourse/reviewcourse';

import { TabsPage } from '../pages/tabs/tabs';

import { ProfilePage } from '../pages/profile/profile';

import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

import { SearchPage } from '../pages/search/search';
import { DirectoryPage } from '../pages/directory/directory';
import { InstructorsPage } from '../pages/instructors/instructors';
import { InstructorPage } from '../pages/instructor/instructor';
import { ResultPage } from '../pages/result/result';
import { UnitCommentPage } from '../pages/unitcomment/unitcomment'; 
import { UploadAssignmentPage } from '../pages/uploadassignment/uploadassignment'; 
import { GroupdirectoryPage } from '../pages/groupdirectory/groupdirectory';
import { GroupPage } from '../pages/group/group';
import { ForumdirectoryPage } from '../pages/forumdirectory/forumdirectory'; 
import { MemberPage } from '../pages/member/member'; 
import { ReplydirectoryPage } from '../pages/replydirectory/replydirectory'; 
import { AttendancePage } from '../pages/attendance/attendance';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { FixedScrollHeader } from '../components/fixed-scroll-header/fixed-scroll-header';
import { StarRatingComponent } from '../components/star-rating/star-rating';
import { AvatarScrollZoomout } from '../components/avatarscrollzoomout/avatarscrollzoomout';
import { CallbackPipe } from '../components/pipefilters';
import { OrderPipe } from '../pipes/orderby';
import { SafeHtmlPipe } from '../pipes/orderby';
import { SafePipe } from '../pipes/orderby';

import { Coursecard } from '../components/coursecard/coursecard';
import { Courseblock } from '../components/courseblock/courseblock';
import { InstructorBlock } from '../components/instructorblock/instructorblock';
import { CommentBlock } from '../components/commentblock/commentblock'; 
import { ChatBlock } from '../components/chatblock/chatblock'; 
import { GroupBlock } from '../components/groupblock/groupblock'; 
import { MemberBlock } from '../components/memberblock/memberblock'; 
import { TopicBlock } from '../components/topicblock/topicblock'; 
import { ReplyBlock } from '../components/replyblock/replyblock'; 
import { MessageBlock } from '../components/messageblock/messageblock'; 
import { VideoGularBlock } from '../components/video-gular/video-gular'; 

import { HomePage } from '../pages/home/home';
import { OfflinePage } from '../pages/offline/offline';
import { NodataPage } from '../pages/nodata/nodata';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { FriendlytimeComponent } from '../components/friendlytime/friendlytime';
import { QuestionComponent } from '../components/question/question';
import { TimerComponent } from '../components/timer/timer';
import { MatchAnswers } from '../components/match/match';
import { Fillblank } from '../components/fillblank/fillblank';
import { Select } from '../components/select/select';
import { AbsoluteDrag } from '../components/absolute-drag/absolute-drag';

import { CourseService } from '../services/course';
import { AuthenticationService } from '../services/authentication';

import { NotesDiscussionService } from "../services/notes_discussions";
import { UploadAssignmentService } from "../services/upload_assignment";
import { Media } from '@ionic-native/media';

import { UserService } from '../services/users';
import { ConfigService } from '../services/config';

import { CourseStatusService } from '../services/status';
import { QuizService } from '../services/quiz';
import { ActivityService } from '../services/activity';
import { UpdatesService } from '../services/updates';
import { WishlistService } from '../services/wishlist';
import { WalletService } from '../services/wallet';
import { GroupService } from '../services/group';
import { MembersService } from '../services/members';

import { DragulaModule,DragulaService} from "ng2-dragula"

import {enableProdMode} from '@angular/core';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';

import { AddEditUnitCommentPage } from '../pages/add-edit-unit-comment/add-edit-unit-comment';
import { MembersDirectoryPage } from '../pages/membersdirectory/membersdirectory';

import { ChatService } from '../services/chat';
import { EmojiPickerModule } from 'ionic-emoji-picker';

// import { AdMob } from "ionic-admob";
// import { AdmobService } from '../services/admob';


import { TopicdirectoryPage } from '../pages/topicdirectory/topicdirectory';
import { ForumBlock } from '../components/forumblock/forumblock'; 
import { ForumService } from '../services/forum';
import { AttendanceService } from '../services/attendance';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// import { OneSignal } from '@ionic-native/onesignal';
import { PushNotificationService } from '../services/push_notification';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import {Network} from '@ionic-native/network/ngx';

import { SideMenuService } from '../services/sidemenu';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
enableProdMode();
@NgModule({
  declarations: [
    MyApp,
    Intro,
    MultiselectorPage,
    AboutPage,
    BlogPage,
    PostPage,
    ContactPage,
    HomePage,
    OfflinePage,
    NodataPage,
    TabsPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    SearchPage,
    DirectoryPage,
    InstructorsPage,
    InstructorPage,
    ResultPage,
    CoursePage,
    CourseStatusPage,
    ReviewCoursePage,
    AttendancePage,
    StarRatingComponent,
    ElasticHeader,
    FixedScrollHeader,
    AvatarScrollZoomout,
    CallbackPipe,
    EmailValidatorDirective,
    OrderPipe,
    SafeHtmlPipe,
    SafePipe,
    ProgressBarComponent,
    FriendlytimeComponent,
    QuestionComponent,
    TimerComponent,
    MatchAnswers,
    Fillblank,
    Select,
    UpdatesPage,
    WishlistPage,
    WalletPage,
    Coursecard,
    Courseblock,
    InstructorBlock,
    LazyImgComponent,
    LazyLoadDirective,
    PressDirective,
    AbsoluteDrag,
    PinchZoomDirective,
    ElasticDirective,
    ionSlideTabs,
    UnitCommentPage,
    CommentBlock,
    ChatBlock,
    GroupBlock,
    ForumBlock,
    MemberBlock,
    TopicBlock,
    ReplyBlock,
    MessageBlock,
    AddEditUnitCommentPage,
    MembersDirectoryPage,
    UploadAssignmentPage,
    GroupdirectoryPage,
    GroupPage,
    MemberPage,
    ForumdirectoryPage,
    TopicdirectoryPage,
    ReplydirectoryPage,
    ChatPage,
    MessagePage,
    VideoGularBlock
  ],
  imports: [
    DragulaModule,
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    EmojiPickerModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Intro,
    MultiselectorPage,
    AboutPage,
    BlogPage,
    PostPage,
    ContactPage,
    OfflinePage,
    NodataPage,
    HomePage,
    TabsPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    DirectoryPage,
    InstructorsPage,
    InstructorPage,
    SearchPage,
    AttendancePage,
    CoursePage,
    CourseStatusPage,
    ResultPage,
    ChatPage,
    MessagePage,
    ReviewCoursePage,
    UpdatesPage,
    WishlistPage,
    WalletPage,
    LazyImgComponent,
    CommentBlock,
    ChatBlock,
    GroupBlock,
    ForumBlock,
    MemberBlock,
    TopicBlock,
    ReplyBlock,
    MessageBlock,
    UnitCommentPage,
    AddEditUnitCommentPage,
    MembersDirectoryPage,
    UploadAssignmentPage,
    GroupdirectoryPage,
    GroupPage,
    MemberPage,
    ForumdirectoryPage,
    TopicdirectoryPage,
    ReplydirectoryPage,
    VideoGularBlock
  ],
  providers: [
  Media,
  NativeAudio,
  FileOpener,
  StatusBar,
  VideoPlayer,
  Network,
  SplashScreen,
  BarcodeScanner,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  DragulaService,
  InAppBrowser,
  InAppPurchase,
  Camera,
  // OneSignal,
  Push,
  Device,
  File,
  Facebook,
  GooglePlus,
  IonicStorageModule,
  ConfigService,
  SideMenuService,
  GroupService,
  ForumService,
  AttendanceService,
  MembersService,
  PushNotificationService,
  AuthenticationService,
  UserService,
  CourseService,
  CourseStatusService,
  QuizService,
  ActivityService,
  UpdatesService, 
  WishlistService,
  WalletService,
  ChatService,
  ImgcacheService,
  BlogService,
  NotesDiscussionService,,
  UploadAssignmentService,
  // AdMob,
  // AdmobService,
  FileTransfer,
  ImagePicker,
  MediaCapture,
  StreamingMedia,
  PhotoViewer,
  File,
  FileTransferObject
  ]
})
export class AppModule {}
