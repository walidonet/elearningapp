import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Injectable()
export class ConfigService {

	loading: boolean;
	timestamp: number;
	lastaccess: number; //Last access datetime with website
	fetchedResources: any;
	user: any;
	isLoggedIn: boolean = false;

	homePage: any;

	public baseUrl: string;
	oAuthUrl: string;

	lastCourse: any;
	environment: any;
	settings: any;

	defaultMenu: any;
	per_view: number = 10;
	translations: any;
	directoryFilters: any;

	/*
		IMPORTANT DO NOT TOUCH
	*/
	defaultTrack: any;
	track: any;
	trackSync: any;
	contactinfo: any;
	terms_conditions: any;
	unread_notifications_count: number = 0;
	wallet: any = [];
	per_page_comment = 10;
	chat: any;
	configfirebase: any;
	batch: any;
	forum: any;
	members_directory: any;
	multisite: any;
	site_index = 0;
	attendance: any
	push_notification: any;
	/*== END == */

	constructor(
		private storage: Storage,
		private http: Http
	) {

		this.loading = true;
		this.timestamp = Math.floor(new Date().getTime() / 1000);
		this.environment = {
			'cacheDuration': 86400,
		};

		this.lastaccess = 0;
		this.storage.get('lastaccess').then(res => {
			if (res) {
				this.lastaccess = res;
			}
		});

		this.per_view = 5;
		this.settings = {
			'version': 2,
			'url':'https://abdelrahman-amr.com/',
			'client_id':'E0UBYbPlGRblIAnczbQXDeh',
			// 'url': 'http://192.168.5.61/wordpressnew/',
			// 'client_id': 'RDRc53PSL8ncHowchpkBi3O',
			'client_secret': 'Q1qxMolp9LIK#^@7w*2%NP4g2ZF1@Hy@6bKqkBzU', //Fetched from API call
			'state': 'yKBGLqGI', // FETCHED from Site
			'access_token': '', // FETCHED on Login
			'registration': 'app',//'app' or 'site' or false
			'login': 'app',//Select from 'app' or 'site' or false
			'facebook': {
				'enable': false,
				'app_id': 491338181212175
			},
			'google': {
				'enable': false,
			},
			'per_view': 5,
			'force_mark_all_questions': false,
			'wallet': false,					// <<----------REQUIRES WPLMS version 3.4
			'inappbrowser_purchases': false, // <<----------REQUIRES WPLMS version 3.4
			'rtl': true,
			'units_in_inappbrowser': false,
			'open_units_in_inappbrowser_auto': true
		};

		this.baseUrl = this.settings.url + 'wp-json/wplms/v1/';
		this.oAuthUrl = this.settings.url + 'wplmsoauth/';

		this.defaultMenu = {
			'home': 'Home',
			'about': 'About',
			'courses': 'Courses',
			'instructors': 'Instructors',
			'contact': 'Contact'
		};

		this.homePage = {
			'featuredCourseSlider': 1,
			'categories': 1,
			'popular': 1,
			'featured': 1,
		};

		this.directoryFilters = {
			'categories': 1,
			'instructors': 1,
			'locations': 1,
			'levels': 1,
			'free_paid': 1,
			'online_offline': 0,
			'start_date': 0,
		};


		/* WALLET RECHARGE : in APP PRODUCT IDS */

		this.wallet = [
			{ 'product_id': 'com.abdelrahmenamro.app.1523164176', 'points': 0 },
		];

		/* Started chat setting */
		this.chat = {
			'enable_chat': true,   // enable or disable chat  set 'true' for enable and 'false' for disable
			'chat_number': 10,   // get pagination for chats
			'message_number': 10,	// get pagination for messages
			'chat_agents': [1, 2, 3, 10], // user id of agents for non-logged in user chat
			'welcome_text': 'مرحبًا بك في دردشة تطبيق عبد الرحمان عمر.',
			'nonloggedinForm': 1,
			'file_size': 5242880,   // in byte for upload file
			'file_type': [
				'image/jpeg',
				'image/png',
				'text/plain',
				'text/html',
				'text/csv',
				'video/mp4',
				'application/pdf',
				'application/zip',
				'audio/mpeg',
				'image/bmp'
			]
		};
		/* Initialize firebase here */
		this.configfirebase = {
			apiKey: "AIzaSyDkSF44PFcXb75lXlXGBK1-S32BoGxn4Zk",
			authDomain: "testproject-cfb58.firebaseapp.com",
			databaseURL: "https://testproject-cfb58.firebaseio.com",
			projectId: "testproject-cfb58",
			storageBucket: "testproject-cfb58.appspot.com",
			messagingSenderId: "567025855633"
		};
		firebase.initializeApp(this.configfirebase);

		/* End of Initialize firebase */
		/* Ended chat settings */


		/* Started batch setting */
		this.batch = {
			'enable_batch': true,    // true|false
			'limit': 5,  			// No. of groups,members, activity,news view
			'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  // Translation can be done for days
			'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']   // Translation can be done for months

		}



		/* Ended batch settings */

		this.forum = {
			'enable_forum': true,    // true|false
			'limit': 10,			    // No. of
			'paged': 1               // do not edit this
		}
		/* Started members-directory setting */
		this.members_directory = {
			'enable_members_directory': true,		 //enable members directory : enable when buddypress member compomnent is active
			'per_page': 10,		 				 // The number of results to return per page.
			'paged': 1               // do not edit this
		}
		/* Ended members-directory setting */


		/*
			Started configuring multisite
		    Translation can be for specific key also support
			other wise it will get translation from this.translation
		*/
		this.multisite = {
			'enable_multisite': false,
			'sites': [
				{
					'site_name': 'Site 1',
					'logo': 'assets/images/multisite_logo.png',
					'translation': {
						'home_title': 'HOME PAGE 1',
						'home_subtitle': 'Featured Items 1',
					},
					'all_settings': {
						'settings': {
							'version': 1,
							'url': 'http://localhost/multisitewplms/',
							'client_id': 'M5u7Hr9gSAFihb44yRAHAys',
							'rtl': true
						},
						'configfirebase': {
							apiKey: "AIzaSyC0eCOfddQ_II4EeFm0X_AKUzU3vkYdVfQ",
							authDomain: "fir-chat-f8c3f.firebaseapp.com",
							databaseURL: "https://fir-chat-f8c3f.firebaseio.com",
							projectId: "fir-chat-f8c3f",
							storageBucket: "fir-chat-f8c3f.appspot.com",
							messagingSenderId: "346813030464"
						},
						'batch': {
							'enable_batch': true,    // true|false
							'limit': 5,  			 // No. of groups,members, activity,news view
							'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  // Translation can be done for days
							'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']   // Translation can be done for months
						}
					}
				},
				{
					'site_name': 'Site 2',
					'logo': 'assets/images/multisite_logo.png',
					'translation': {
						'home_title': 'HOME PAGE 2',
						'home_subtitle': 'Featured Items 2',
					},
					'all_settings': {
						'settings': {
							'version': 1,
							'url': 'http://localhost/multisitewplms/site2/',
							'client_id': 'CwnH6u8BgDEiENScXlgMMA3',
							'rtl': true
						},
						'configfirebase': {
							apiKey: "AIzaSyC0eCOfddQ_II4EeFm0X_AKUzU3vkYdVfQ",
							authDomain: "fir-chat-f8c3f.firebaseapp.com",
							databaseURL: "https://fir-chat-f8c3f.firebaseio.com",
							projectId: "fir-chat-f8c3f",
							storageBucket: "fir-chat-f8c3f.appspot.com",
							messagingSenderId: "346813030464"
						},
						'batch': {
							'enable_batch': false,    // true|false
							'limit': 5,  			 // No. of groups,members, activity,news view
							'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  // Translation can be done for days
							'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']   // Translation can be done for months
						}
					}
				},
				{
					'site_name': 'Site 3 wordpressnew',
					'logo': 'assets/images/multisite_logo.png',
					'translation': {
						'home_title': 'HOME PAGE 3',
						'home_subtitle': 'Featured Items 3',
					},
					'all_settings': {
						'settings': {
							'version': 1,
							'url': 'http://localhost/wordpressnew/',
							'client_id': 'RDRc53PSL8ncHowchpkBi3O',
							'rtl': true
						},
						'configfirebase': {
							apiKey: "AIzaSyC0eCOfddQ_II4EeFm0X_AKUzU3vkYdVfQ",
							authDomain: "fir-chat-f8c3f.firebaseapp.com",
							databaseURL: "https://fir-chat-f8c3f.firebaseio.com",
							projectId: "fir-chat-f8c3f",
							storageBucket: "fir-chat-f8c3f.appspot.com",
							messagingSenderId: "346813030464"
						},
						'batch': {
							'enable_batch': false,    // true|false
							'limit': 5,  			 // No. of groups,members, activity,news view
							'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  // Translation can be done for days
							'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']   // Translation can be done for months
						}
					}
				},
				{
					'site_name': 'Site 4 Wplms.io',
					'logo': 'assets/images/multisite_logo.png',
					'translation': {
						'home_title': 'HOME PAGE 4',
						'home_subtitle': 'Featured Items 4',
					},
					'all_settings': {
						'settings': {
							'version': 1,
							'url': 'https://wplms.io/',
							'client_id': '9gWLZgmn45Es4cjoAUPopRX',
							'rtl': true
						},
						'configfirebase': {
							apiKey: "AIzaSyC0eCOfddQ_II4EeFm0X_AKUzU3vkYdVfQ",
							authDomain: "fir-chat-f8c3f.firebaseapp.com",
							databaseURL: "https://fir-chat-f8c3f.firebaseio.com",
							projectId: "fir-chat-f8c3f",
							storageBucket: "fir-chat-f8c3f.appspot.com",
							messagingSenderId: "346813030464"
						},
						'batch': {
							'enable_batch': false,    // true|false
							'limit': 5,  			 // No. of groups,members, activity,news view
							'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  // Translation can be done for days
							'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']   // Translation can be done for months
						}
					}
				},
				{
					'site_name': 'Site 5 multiste2 site 2',
					'logo': 'assets/images/multisite_logo.png',
					'translation': {
						'home_title': 'HOME PAGE 5',
						'home_subtitle': 'Featured Items 5',
					},
					'all_settings': {
						'settings': {
							'version': 1,
							'url': 'http://localhost/multisitewplms2/site2/',
							'client_id': 'YkAYGnws2zP1OHfZa3Uo9aT',
							'rtl': true
						},
						'configfirebase': {
							apiKey: "AIzaSyC0eCOfddQ_II4EeFm0X_AKUzU3vkYdVfQ",
							authDomain: "fir-chat-f8c3f.firebaseapp.com",
							databaseURL: "https://fir-chat-f8c3f.firebaseio.com",
							projectId: "fir-chat-f8c3f",
							storageBucket: "fir-chat-f8c3f.appspot.com",
							messagingSenderId: "346813030464"
						},
						'batch': {
							'enable_batch': false,    // true|false
							'limit': 5,  			 // No. of groups,members, activity,news view
							'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  // Translation can be done for days
							'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']   // Translation can be done for months
						}
					}
				}
			]
		};
		/* Ended configuring multisite */



		/* Started attendance setting */
		this.attendance = {
			'enable_attendance': true,
			'enable_mark_attendance': true  //mark work when attendance is enable
		}
		/* Ended attendance setting */

		/* Started Push notification settings*/
		this.push_notification = {
			'enable_push_notification': true,
			'senderID': '848705640498',  // here enter your sendedr ID
			'duration': 2000,
			'registrationId': ''  // fetch from device
		}
		/* Ended Push notification settings */

		/* TRACKS LOADED COMPONENTS
			STATUS :
				0 NOT LOADED
				1 LOADED
				In array : Loaded
		*/
		this.defaultTrack = {
			'version': 1,
			'counter': 0,
			'user': 0,
			'featured': 0,// Check if there is any change in featured courses
			'popular': 0,// Check if there is any change in popular courses
			'allcoursecategories': 0,
			'allcourselocations': 0,
			'allcourselevels': 0,
			'allcourses': 0,
			'allposts': 0,
			'transactions': 0,
			'posts': [],
			'dashboardCharts': [],
			'courses': [], // if loaded it exists here
			'stats': 0, // Check if any need to reload student statistics
			'notifications': 0, // Check if any new notifications are added.
			'announcements': 0, // Check if any new announcements are added for user
			'allinstructors': 0,//track if new instructor is added in site
			'instructors': [], //if loaded it exists here
			'profile': 0,
			'profiletabs': [],//if loaded it exists here
			'reviews': [],
			'course_status': [], //load course curriclum & statuses
			'statusitems': [],
			'saved_results': [],
			'comments': [],
			'assignments': [],
			'members': []
		};
		this.track = this.defaultTrack;

		if (this.batch.enable_batch) {
			this.track['allgroups'] = 0;
			this.track['groups'] = [];
		}

		this.unread_notifications_count = 0;
//walid
		this.translations = {
			'home_title'	:	'الصفحة الرئيسية',
'home_subtitle'	:	'السلع المعروضة',
'start_course'	:	'بداية',
'search_title'	:	'يبحث..',
'continue_course'	:	'استمر',
'completed_course'	:	'منجز',
'expired_course'	:	' ',
'evaluation_course'	:	' ',
'no_reviews'	:	'لم يتم العثور على مراجعات لهذه الدورة.' ,
'year'	:	'عام',
'years'	:	'سنوات',
'month'	:	'شهر',
'months'	:	'الشهور',
'week'	:	'أسبوع',
'weeks'	:	'أسابيع' ,
'day'	:	'يوم',
'days'	:	'أيام',
'hour'	:	'ساعة',
'hours'	:	'ساعات' ,
'minute'	:	'دقيقة',
'minutes'	:	'الدقائق',
'second'	:	'ثانيا',
'seconds'	:	'ثواني' ,
'expired'	:	' ',
'completed'	:	'منجز',
'start_quiz'	:	'بدء الاختبار' ,
'save_quiz'	:	'حفظ الاختبار' ,
'submit_quiz'	:	'إرسال الاختبار',
'marks'	:	'ماركس' ,
'marks_obtained'	:	'العلامات المتحصل عليها',
'max_marks'	:	'العلامات القصوى' ,
'true'	:	'صحيح',
'false'	:	'خاطئة',
'checkanswer'	:	'تحقق من الجواب',
'score'	:	'أحرز هدفا',
'progress'	:	'التقدم' ,
'time'	:	'زمن',
'filter_options'	:	'خيارات التصفية',
'sort_options'	:	'خيارات بسيطة' ,
'popular'	:	'جمع',
'recent'	:	'الأخيرة',
'alphabetical'	:	'مرتب حسب الحروف الأبجدية',
'rated'	:	'الأعلى تقييماً' ,
'start_date'	:	'القادمة',
'okay'	:	'حسنا',
'dismiss'	:	'رفض' ,
'select_category'	:	'اختر الفئة',
'select_location'	:	'اختر موقعا',
'select_level'	:	'اختار مستوى',
'select_instructor'	:	'حدد مدرب' ,
'free_paid'	:	'حدد سعر الدورة' ,
'price'	:	'السعر',
'apply_filters'	:	'تطبيق الفلاتر' ,
'close'	:	'قريب',
'not_found'	:	'لم يتم العثور على دورات تطابق معاييرك' ,
'no_courses'	:	'لا توجد دورات!' ,
'course_directory_title'	:	'جميع الدورات' ,
'course_directory_sub_title'	:	'دليل الدورة' ,
'all'	:	'الكل',
'all_free'	:	'مجانا',
'all_paid'	:	'دفع',
'select_online_offline'	:	'اختر نوع الدورة' ,
'online'	:	'عبر الانترنت',
'offline'	:	'غير متصل على الانترنت',
'after_start_date'	:	'يبدأ بعد التاريخ' ,
'before_start_date'	:	'يبدأ قبل التاريخ' ,
'instructors_page_title'	:	'جميع المدربين' ,
'instructors_page_description'	:	'دليل المعلم' ,
'no_instructors'	:	'لم يتم العثور على معلمين' ,
'get_all_course_by_instructor'	:	'عرض جميع الدورات التدريبية من قبل المدرب' ,
'profile'	:	'الملف الشخصي',
'about'	:	'حول',
'courses'	:	'الدورات',
'marked_answer'	:	'الإجابة المحددة' ,
'correct_answer'	:	'اجابة صحيحة',
'explanation'	:	'تفسير',
'awaiting_results'	:	'في انتظار نتائج الاختبار' ,
'quiz_results'	:	'نتيجة الاختبار' ,
'retake_quiz'	:	'استعد الاختبار' ,
'quiz_start'	:	'بدأ الاختبار' ,
'quiz_start_content'	:	'لقد بدأت الاختبار' ,
'quiz_submit'	:	'تم إرسال الاختبار' ,
'quiz_submit_content'	:	'لقد أرسلت الاختبار' ,
'quiz_evaluate'	:	'تم تقييم الاختبار' ,
'quiz_evaluate_content'	:	'تم تقييم الاختبار' ,
'certificate'	:	'شهادة',
'badge'	:	'شارة',
'no_notification_found'	:	'لم يتم العثور على إشعارات!' ,
'no_activity_found'	:	'لم يتم العثور على نشاط!' ,
'back_to_course'	:	'العودة إلى الدورة' ,
'review_course'	:	'دورة مراجعة' ,
'finish_course'	:	'إنهاء الدورة' ,
'login_heading'	:	'تسجيل الدخول',
'login_title'	:	'البدء',
'login_content'	:	'ستكون دوراتك متاحة على جميع أجهزتك' ,
'login_have_account'	:	'هل لديك حساب',
'login_signin'	:	'تسجيل الدخول',
'login_signup'	:	'سجل',
'bbb_buuton'	:	'الجلسة المفتوحة',
'login_terms_conditions'	:	'الأحكام والشروط',
'signin_username'	:	'اسم المستخدم أو البريد الالكتروني',
'signin_password'	:	'كلمه السر',
'signup_username'	:	'اسم المستخدم',
'signup_email'	:	'رسائل البريد الإلكتروني' ,
'signup_password'	:	'كلمه السر',
'signup'	:	'سجل',
'login_back'	:	'العودة لتسجيل الدخول' ,
'post_review'	:	'نشر مراجعة لهذه الدورة' ,
'review_title'	:	'عنوان للمراجعة' ,
'review_rating'	:	'تقييم لهذه المراجعة' ,
'review_content'	:	'محتوى للمراجعة' ,
'submit_review'	:	'مراجعة آخر',
'rating1star'	:	'دورة سيئة' ,
'rating2star'	:	'لا تصل إلى العلامة' ,
'rating3star'	:	'مرض',
'rating4star'	:	'دورة جيدة' ,
'rating5star'	:	'ممتاز',
'failed'	:	'فشل',
'user_started_course'	:	'لقد بدأت دورة' ,
'user_submitted_quiz'	:	'لقد قدمت الاختبار' ,
'user_quiz_evaluated'	:	'تم تقييم الاختبار' ,
'course_incomplete'	:	'الدورة التدريبية غير مكتملة' ,
'finish_this_course'	:	'يرجى وضع علامة على جميع وحدات هذه الدورة' ,
'ok'	:	'حسنا',
'update_title'	:	'تحديثات' ,
'update_read'	:	'اقرأ',
'update_unread'	:	'غير مقروءة' ,
'no_updates'	:	'لم يتم العثور على تحديثات' ,
'wishlist_title'	:	'قائمة الرغبات',
'no_wishlist'	:	'لم يتم العثور على دورات قائمة أمنيات' ,
'no_finished_courses'	:	'لا توجد دورات منتهية!' ,
'no_results'	:	'لم يتم العثور على نتائج!',
'loadingresults'	:	'ارجوك انتظر...',
'signup_with_email_button_label'	:	'الاشتراك ببريدك الإلكتروني' ,
'clear_cache'	:	'مسح البيانات دون اتصال' ,
'cache_cleared'	:	'تم مسح ذاكرة التخزين المؤقت في وضع عدم الاتصال' ,
'sync_data'	:	'مزامنة البيانات',
'data_synced'	:	'تمت مزامنة البيانات' ,
'logout'	:	'تسجيل خروج',
'loggedout'	:	'لقد قمت بتسجيل الخروج بنجاح!' ,
'register_account'	:	'تسجيل الدخول أو إنشاء حساب للمتابعة!' ,
'email_certificates'	:	'شهادات البريد الإلكتروني' ,
'manage_data'	:	'إدارة البيانات المخزنة' ,
'saved_information'	:	'المعلومات المحفوظة' ,
'client_id'	:	'مفتاح الموقع',
'saved_quiz_results': 'Saved Results', 'timeout'	:	'نفذ الوقت',
'app_quiz_results'	:	'النتائج',
'change_profile_image'	:	'تغيير صورة الملف الشخصي' ,
'pick_gallery'	:	'تعيين صورة من المعرض' ,
'take_photo'	:	'التقط صورتي' ,
'cancel'	:	'إلغاء',
'blog_page'	:	'صفحة المدونة' ,
'course_chart'	:	"إحصائيات الدورة التدريبية" ,
'quiz_chart'	:	"إحصائيات الاختبار",
'percentage'	:	'النسبة المئوية',
'scores'	:	'درجات',
'edit'	:	'تعديل',
'change'	:	'يتغيرون',
'edit_profile_field'	:	'تحرير حقل ملف التعريف' ,
'pull_to_refresh'	:	'سحب لتحديث',
'refreshing'	:	'...منعش',
'contact_page'	:	'اتصل',
'contact_name'	:	'اسم',
'contact_email'	:	'البريد الإلكتروني',
'contact_message'	:	'رسالة',
'contact_follow_us'	:	'تابعنا',
'invalid_url'	:	'قيمة عنوان url غير صالحة' ,
'read_notifications'	:	'قراءة الإشعارات' ,
'unread_notifications'	:	'الإشعارات غير المقروءة' ,
'logout_from_device'	:	'هل أنت متأكد من أنك تريد تسجيل الخروج من هذا الجهاز؟' ,
'accept_continue'	:	'قبول ومتابعة' ,
'finished'	:	'تم الانتهاء من',
'active'	:	'نشيط',
'open_results_on_site'	:	'يرجى التحقق من نتائج هذا الاختبار في المتصفح.' ,
'show_more'	:	'أكثر',
'show_less'	:	'أقل',
'buy'	:	'يشترى',
'pricing_options'	:	'خيارات التسعير' ,
'pricing_options_title'	:	'خيارات التسعير (اسحب للتحديد)' ,
'home_menu_title'	:	'الصفحة الرئيسية',
'directory_menu_title'	:	'الدورات',
'instructors_menu_title'	:	'المدربون' ,
'blog_menu_title'	:	'مدونة',
'contact_menu_title'	:	'اتصل',
'popular_courses_title_home_page'	:	'الدورات الشعبية' ,
'popular_courses_subtitle_home_page'	:	"الدورات الشعبية والرائجة",
'categories_title_home_page'	:	'التصنيفات',
'categories_subtitle_home_page'	:	'تصفح الدورات عن طريق فئة الدورة التدريبية' ,
'directory_search_placeholder'	:	'بحث',
'featured_courses'	:	'الدورات المميزة' ,
'selected_courses'	:	'دورات مختارة' ,
'markallquestions'	:	'يرجى وضع علامة على جميع الأسئلة أولاً.' ,
'credit'	:	'ائتمان',
'debit'	:	'مدين',
'wallet_no_products'	:	'استشر المسؤول لإنشاء منتجات المحفظة!' ,
'wallet_no_transactions'	:	'لم يتم العثور على معاملات!' ,
'pay_from_wallet'	:	'الدفع من المحفظة' ,
'use_wallet'	:	'استخدم مبلغ المحفظة للشراء' ,
'pay'	:	'دفع',
'login_to_buy'	:	'يرجى تسجيل الدخول لشراء هذه الدورة' ,
'login_again'	:	'الرجاء إعادة تسجيل الدخول لشراء هذه الدورة' ,
'insufficient_funds'	:	'أموال غير كافية في المحفظة! أضف المزيد من الأموال. ',
'buy_from_site'	:	'الشراء من الموقع' ,
'description'	:	'وصف',
'curriculum'	:	'منهاج دراسي',
'reviews'	:	'مراجعات' ,
'instructors'	:	'المدربين' ,
'retakes_remaining'	:	'يستعيد الباقي' ,
'open_in_new_window'	:	'افتح في نافذة جديدة',
'show_notes'	:	'إظهار الملاحظات والمناقشات' ,
'unit_attachments'	:	'مرفقات الوحدة' ,
'Adding_new_comment'	:	'إضافة تعليق جديد' ,
'Replying_to_comment'	:	'الرد على' ,
'Editing_comment'	:	'تحرير تعليق' ,
'Submit_Comment'	:	'إرسال تعليق',
'Reply_comment'	:	'الرد',
'Edit_comment'	:	'تعديل',
'Show_children'	:	'إظهار الطفل' ,
'Hide_children'	:	'إخفاء الطفل' ,
'Unitcomment'	:	'تعليق الوحدة' ,
'No_comment_avail'	:	'لا مزيد من التعليقات المتاحة' ,
'Add_comment'	:	'أضف تعليق',
'Load_comment'	:	'تحميل تعليق' ,
'Enter_your_comment'	:	'أدخل تعليقك' ,
'Cancel'	:	'إلغاء',
'insufficient_content'	:	'أضف المزيد من النص ليتم حفظه!' ,
'start_assignment'	:	'بدء التعيين' ,
'upload_assignment'	:	'تحميل مهمة' ,
'your_attachment'	:	'مرفقك' ,
'your_attachment_comment'	:	'تعليقك',
'assignment_content'	:	'محتوى المهمة' ,
'all_assignment'	:	'جميع المهام' ,
'Not_match_size_or_type'	:	'نوع الملف أو حجمه غير متطابق' ,
'Allowed_file_size'	:	'حجم الملف المسموح به' ,
'Allowed_extensions'	:	'نوع الإضافة المسموح به' ,
'You_have_2_minutes_remaining'	:	'لديك دقيقتان متبقيتان' ,
'file_not_selected_comment_not_entered'	:	'لم يتم تحديد الملف أو لم يتم إدخال تعليق' ,
'Timer_expired'	:	'انتهت صلاحية المؤقت' ,
'start_now'	:	'ابدأ الآن',
'mychats'	:	'دردشاتى' ,
'members'	:	'أفراد',
'chat'	:	'دردشة',
'start_chat'	:	'بدء الدردشة' ,
'start_new_chat'	:	'بدء محادثة جديدة' ,
'chat_message'	:	'رسالة الدردشة' ,
'chat_email'	:	'عنوان الايميل',
'chat_name'	:	'اسم',
'notification_send'	:	'إرسال الإخطار' ,
'just_now'	:	'في هذة اللحظة',
'search_user_from_website'	:	'بحث من الموقع' ,
'more'	:	'أكثر',
'is_typing'	:	'يكتب',
'search_user_from_firebase'	:	'مستخدمين على الهواء',
'online_user_to_initiate_new_chat'	:	'بدء الدردشة من مستخدمي الإنترنت' ,
'user_from_site_you_can_not_chat'	:	'لا يمكنك الدردشة مع مستخدمي الموقع' ,
'chat_initialized'	:	'تم بدء الدردشة' ,
'Lenght_greater_than3'	:	'اكتب أكثر من 3 أحرف' ,
'type_here'	:	'اكتب هنا لتصفية المستخدمين' ,
'send_message'	:	'إرسال',
'type_message'	:	'أكتب هنا',
'back_to_chat'	:	'العودة إلى الرسائل' ,
'file_not_valid'	:	'الملف ليس تحميلًا صالحًا مع شكل أو حجم آخر' ,
'type_something'	:	'اطبع شيئا..',
'file_selected'	:	'الملف المحدد يبدأ الكتابة ..',
'file_not_selected'	:	'الملف غير محدد ابدأ الكتابة ..',
'load_new_messages'	:	'تحميل المزيد',
'group_directory'	:	'المجموعات والدفعات' ,
'no_batches_in_course'	:	'دفعات غير موجودة لهذه الدورة' ,
'batch'	:	'دفعات' ,
'money_refunded'	:	'تم رد الأموال' ,
'money_deducted'	:	'الأموال المخصومة' ,
'not_enough_money_to_purchase_batch'	:	'ليس هناك ما يكفي من المال لشراء الدفعة' ,
'transaction_failed'	:	'فشل Transacion' ,
'money_deducted_joined'	:	'تم خصم الأموال والانضمام إلى الدفعة' ,
'buy_batch'	:	'شراء الدفعة' ,
'login_buy_batch'	:	'الرجاء تسجيل الدخول لشراء دفعة!' ,
'no_access_from_batch'	:	'لا يمكنك الوصول من الدفعة إلى هذه الدورة' ,
'group_name'	:	'أسم المجموعة',
'group_description'	:	'وصف المجموعة',
'total_members'	:	'مجموع الأعضاء',
'batch_seats'	:	"مقاعد دفعة" ,
'start_batch_date'	:	'تاريخ البدء',
'end_batch_date'	:	'تاريخ الانتهاء',
'batch_start_time'	:	'وقت البدء',
'batch_end_time'	:	'وقت النهاية',
'weekly_schedule_off'	:	'إيقاف الجدول الأسبوعي' ,
'now_to'	:	'الآن ل',
'not_set'	:	'غير مضبوط',
'continue'	:	'استمر',
'no_member_found'	:	'لم يتم العثور على عضو' ,
'no_news_found'	:	'لم يتم العثور على أخبار' ,
'groups'	:	'مجموعات',
'batches'	:	'دفعات' ,
'join_batch'	:	'الرجاء الانضمام إلى الدفعة!' ,
'newlyCreated'	:	'حديثة الانشاء',
'lastActive'	:	'آخر نشاط' ,
'mostMembers'	:	'معظم الأعضاء' ,
'upComing'	:	'القادمة',
'Batches_not_enable_in_app'	:	'المكوّن الإضافي للدفعات غير نشط في التطبيق' ,
'members_directory'	:	'دليل الأعضاء' ,
'topic_directory'	:	'دليل المواضيع' ,
'reply_directory'	:	'دليل الرد' ,
'no_member'	:	'لم يتم العثور على عضو' ,
'no_group'	:	'لم يتم العثور على مجموعة' ,
'reply_not_found'	:	'لم يتم العثور على الرد!' ,
'ascending'	:	'تصاعدي',
'descending'	:	'تنازلي' ,
'topic_title'	:	'عنوان الموضوع',
'topic_content'	:	'محتوى الموضوع' ,
'reply_content'	:	'محتوى الرد' ,
'create_topic'	:	'إنشاء موضوع' ,
'create_reply'	:	'إضافة الرد',
'edit_content'	:	'تحرير المحتوى ' ,
'edit_reply'	:	'تحرير عرض',
'delete_reply'	:	'حذف الرد' ,
'create'	:	'خلق',
'update'	:	'تحديث',
'updating'	:	'جارٍ التحديث ...' ,
'creating'	:	'خلق...',
'sure_to_delete_reply'	:	'اضغط Ok لحذف الرد' ,
'forum_not_enable_in_app'	:	'المنتدى غير ممكن في التطبيق' ,
'limit_reached_to_get_reward'	:	'تم الوصول إلى الحد الأقصى للحصول على المكافأة' ,
'points_added'	:	"تمت إضافة الجسور" ,
'forum_directory'	:	'دليل المنتدى' ,
'forum_not_found'	:	'المنتدى غير موجود!' ,
'topic_not_found'	:	'لم يتم العثور على الموضوع!' ,
'oldest_post_first'	:	'الأقدم أولا',
'latest_post_first'	:	'الأحدث أولاً' ,
'login_to_access'	:	'تسجيل الدخول للوصول' ,
'join_to_access'	:	'الانضمام إلى الوصول' ,
'marked_attendance'	:	'ملحوظ',
'unmarked_attendance'	:	'غير مميزة' ,
'mark_today_attendance'	:	'بمناسبة حضور اليوم الحالي' ,
'scanning_barcode'	:	'مسح الرمز الشريطي' ,
'marking_attendance'	:	'الحضور الحضور' ,
'getting_course_attendance'	:	'الحصول على حضور الدورة' ,
'attendance_not_enable'	:	'الحضور غير ممكن' ,
'select_site'	:	'حدد الموقع' ,
'select_language'	:	'اختار اللغة',
'admins'	:	'مشرف',
'mods'	:	'تعديل' ,
'public'	:	'عامة',
'private'	:	'نشر',
'hidden'	:	'مخفي' ,
'start_end_dates'	:	'البداية - تواريخ الانتهاء'

		};
		//deano



		this.contactinfo = {
			'title': 'Contact Us',
			'message': 'Welcome to WPLMS App contact form. This is some message which is displayed on contact page. It supports HTML as well.',
			'address': '4 Pennsylvania Plaza, New York, NY 10001, USA',
			'email': 'vibethemes@gmail.com',
			'phone': '9999999999',
			'twitter': 'vibethemes',
			'facebook': 'vibethemes',
		};
		this.terms_conditions = 'These are app terms and conditions. Any user using this app must have\
		an account on site YouRSite.com. You must not distribute videos in this app to third parties.';
	}

	set_multisite(i: any) {
		if (this.multisite.enable_multisite && this.multisite.sites[i] && this.multisite.sites[i].all_settings) {

			// override config.setting for specific key
			if (this.multisite.sites[i].all_settings.settings) {
				Object.keys(this.multisite.sites[i].all_settings.settings).map((key) => {
					this.settings[key] = this.multisite.sites[i].all_settings.settings[key];
				});
			}

			// override config.chat and call chat object
			if (this.multisite.sites[i].all_settings.configfirebase) {
				this.configfirebase = this.multisite.sites[i].all_settings.configfirebase;
				let firebaseconfig = this.configfirebase;
				// reinitialize firebase app
				firebase.app().delete().then(function () {
					firebase.initializeApp(firebaseconfig);
				});

			}

			// override config.batch
			if (this.multisite.sites[i].all_settings.batch) {
				this.batch = this.multisite.sites[i].all_settings.batch;
			}

			// override config.forum
			if (this.multisite.sites[i].all_settings.forum) {
				this.forum = this.multisite.sites[i].all_settings.forum;
			}

			// override config.attendance
			if (this.multisite.sites[i].all_settings.attendance) {
				this.attendance = this.multisite.sites[i].all_settings.attendance;
			}

			// override config.attendance
			if (this.multisite.sites[i].all_settings.push_notification) {
				this.attendance = this.multisite.sites[i].all_settings.push_notification;
			}

		}
		// set base url with config.settings url
		this.set_base_url();
		this.site_index = i;
		this.storage.get('track').then((track) => {
			if (track) {
				this.track = track;
			}

		});
		this.storage.get('user').then((user) => {
			if (user) {
				this.user = user;
			}

		})
		console.log('$$$$$$$$$$$$$$$$$$$$$$ After mutisite $$$$$$$$$');
		console.log(this);
	}


	// this will be call after set_multisite and set_multilanguage : first clear things then set with new one
	set_multi_setting(i: any) {
		this.track = this.defaultTrack;
		this.storage.clear();
		this.storage.set('track', this.track);
		this.storage.set('introShown', true);
		this.storage.set('settings', this.settings);
		this.site_index = i;
		this.storage.set('site_index', i);
	}

	// set base url with setting.url
	set_base_url() {
		this.baseUrl = this.settings.url + 'wp-json/wplms/v1/';
	}

	get_translation(key: string) {
		if (this.multisite.enable_multisite) {
			if (this.multisite.sites[this.site_index].translation && this.multisite.sites[this.site_index].translation[key]) {
				return this.multisite.sites[this.site_index].translation[key];
			} else {
				if (this.translations[key]) {
					return this.translations[key];
				}
			}
		} else {
			if (this.translations[key]) {
				return this.translations[key];
			}
		}
	}

	trackComponents(key: string) {
		return this.track[key];
	}

	updateComponents(key, value) {
		if (Array.isArray(this.track[key])) {
			this.track[key].push(value);
			this.storage.set('track', this.track);
		} else {
			this.track[key] = value;
			this.storage.set('track', this.track);
		}
	}

	//Only for arrays
	removeFromTracker(key, value) {
		if (Array.isArray(this.track[key])) {
			if (this.track[key].length) {
				if (this.track[key].indexOf(value) != -1) {
					let k = this.track[key].indexOf(value);
					this.track[key].splice(k, 1);
					this.storage.set('track', this.track);
				}
			}
		}
	}
	addToTracker(key, value) {
		if (Array.isArray(this.track[key])) {
			if (this.track[key].indexOf(value) == -1) {
				console.log('in add to tracker array');
				this.track[key].push(value);
			}
		} else {
			console.log('in add to tracker single value');
			this.track[key] = value;
		}
		console.log(this.track);
		this.storage.set('track', this.track);
	}

	public set_settings(key, value) {
		this.settings[key] = value;
		this.storage.set('settings', this.settings);
	}
	save_settings() {
		this.storage.set('settings', this.settings);
	}

	initialize() {
		this.storage.get('track').then(res => {
			if (res) {
				this.track = res;
			}
		});

		this.storage.get('settings').then(res => {
			if (res) {
				this.settings = res;
			}
		});

		this.storage.get('user').then(res => {
			if (res) {
				this.user = res;
				if (this.user['id']) {
					this.isLoggedIn = true;
					/* make firebase login from storage */
					this.firebase_login_from_storage(this.user);
				}
			}
			this.getTracker();
		});

		this.storage.get('lastcourse').then((d) => {
			this.lastCourse = d;
		});
	}

	firebase_login_from_storage(user) {
		// make firebase hit here to register new user
		if (this.chat.enable_chat) {
			this.register_new_user(user);// make login to user or register
		}
		// end of registration
	}

	register_new_user(new_user_obj) {
		let $this = this;
		let type = 'student';  // get type here admin or  student

		firebase.database()
			.ref(`/users/${new_user_obj.id}`)
			.once('value', function (snapdata) {
				if (snapdata.val() == null) {
					let user = {
						'email': new_user_obj.email,
						'id': new_user_obj.id,
						'image': new_user_obj.avatar,
						'name': new_user_obj.name,
						'status': 1
					}

					firebase.database().ref(`/users/${new_user_obj.id}/id`).set(new_user_obj.id);
					firebase.database().ref(`/users/${new_user_obj.id}/image`).set(new_user_obj.avatar);
					firebase.database().ref(`/users/${new_user_obj.id}/name`).set(new_user_obj.name);
					firebase.database().ref(`/users/${new_user_obj.id}/status`).set(1);
					firebase.database().ref(`/users/${new_user_obj.id}/type`).set(type);



					firebase.database().ref(`/users/${new_user_obj.id}/base`).set(user)
						.then((value) => {
							user.id = value.key; //new creted user id

							// some onDisconnect operational event
							firebase.database().ref(`/users/${user.id}/status`).onDisconnect().set(0);
							firebase.database().ref(`/users/${user.id}/lastActive`).onDisconnect().set(Date.now());
							firebase.database().ref(`/users/${user.id}/base/status`).onDisconnect().set(0);
							firebase.database().ref(`/users/${user.id}/base/lastActive`).onDisconnect().set(Date.now());

							//set base->id=new created user id and new chat assign
							firebase.database().ref(`/users/${user.id}/base/`).set(user).then((new_value) => {
								console.log('new user registered');
							});
						});
				} else {
					/*set status of user 1 if user logged_in int App also make
						user status 0 if user not disconnect
					*/
					// $this.config.user.id
					firebase.database().ref(`/users/${new_user_obj.id}/status`).set(1);
					firebase.database().ref(`/users/${new_user_obj.id}/status`).onDisconnect().set(0);
					firebase.database().ref(`/users/${new_user_obj.id}/lastActive`).onDisconnect().set(Date.now());
					firebase.database().ref(`/users/${new_user_obj.id}/base/status`).onDisconnect().set(0);
					firebase.database().ref(`/users/${new_user_obj.id}/base/lastActive`).onDisconnect().set(Date.now());
				}
			});
	}


	isLoading() {
		return this.storage.get('track');
	}

	updateUser() {
		this.storage.get('user').then(res => {
			if (res) {
				this.user = res;
				if (this.user['id']) {
					this.isLoggedIn = true;
				}
			} else {
				this.isLoggedIn = false;
				this.user = 0;
				this.storage.remove('user');
			}
		});
	}
	getLastCourse() {
		this.storage.get('lastcourse').then((d) => {
			this.lastCourse = d;
		});
	}
	matchObj(big: any, small: any) {

		for (let i = 0; i < big.length; i++) {
			if (big[i].time == small.time && big[i].content == small.content) {
				return true;
			}
		}
		return false;
	}






	getTracker() {
		let $this = this;

		console.log('FETCH STORED TRACKER');


		if (this.isLoggedIn) {



			this.http.get(`${this.baseUrl}track/` + this.user.id + `?access=` + this.lastaccess)
				.map(response => {
					return response.json();
				}).subscribe(res => {
					if (res) {
						console.log('Version compare : ' + res.version + ' == ' + this.track.version);
						if (res.version != this.track.version) {
							//Re-record all cached data.
							this.defaultTrack.version = res.version;
							this.track = this.defaultTrack;
						} else {

							if (res.counter != this.track.counter || !res.counter) {

								var keys = Object.keys(res);
								if (keys.length) {
									keys.map((key) => {
										if (key in this.track) {
											if (Array.isArray(this.track[key])) {
												if (typeof res[key] === 'object') {
													Object.keys(res[key]).map((r) => {
														let c = $this.track[key].indexOf(parseInt(r));
														if (c > -1) {
															console.log('splicing...' + key)
															$this.track[key].splice(c, 1)
															console.log($this.track[key]);
														}
													});
												} else if (Array.isArray(res[key])) {
													res[key].map((r) => {
														let c = $this.track[key].indexOf(parseInt(r));
														if (c > -1) {
															console.log('splicing...' + key)
															$this.track[key].splice(c, 1)
															console.log($this.track[key]);
														}
													});
												}
											} else {
												if (key !== 'version') {
													if (!isNaN(res[key]) && res[key] > 1) {
														$this.track[key] = res[key];
													}
												}
											}
										}

										if (key == 'updates') {
											this.storage.get('updates').then(storedupdates => {
												if (!storedupdates) { storedupdates = []; }

												for (let k = 0; k < res[key].length; k++) {
													if (!this.matchObj(storedupdates, res[key][k])) {
														storedupdates.push(res[key][k]);
													}
												}
												this.storage.set('updates', storedupdates);
											});
										}
									});
								}

								this.storage.set('track', this.track);
								this.storage.set('lastaccess', this.timestamp);
							}
						}
					}
				});

			this.storage.get('updates').then(storedupdates => {
				if (storedupdates) {
					this.unread_notifications_count = storedupdates.length;
					this.storage.get('readupdates').then(readupdates => {
						if (readupdates) {
							this.unread_notifications_count = storedupdates.length - readupdates.length;
						}
					});
				}
			});
		} else {

			var url = `${this.baseUrl}track/?access=` + this.lastaccess;

			if (!this.settings.client_secret.length) {
				url = `${this.baseUrl}track/?client_id=` + this.settings.client_id + `&access=` + this.lastaccess;
			}

			this.http.get(url)
				.map(response => {
					return response.json();
				}).subscribe(res => {

					if (res) {
						if (res.version != this.track.version) {
							//Re-record all cached data.
							this.defaultTrack.version = res.version;
							this.track = this.defaultTrack;

						} else {

							if ((res.counter != this.track.counter || !res.counter)) {

								var keys = Object.keys(res);
								if (keys.length) {
									keys.map((key) => {
										if (key in this.track) {
											if (Array.isArray(this.track[key])) {
												if (typeof res[key] === 'object') {
													Object.keys(res[key]).map((r) => {
														let c = $this.track[key].indexOf(parseInt(r));
														if (c > -1) {
															console.log('splicing...' + key)
															$this.track[key].splice(c, 1)
															console.log($this.track[key]);
														}
													});
												} else if (Array.isArray(res[key])) {
													res[key].map((r) => {
														let c = $this.track[key].indexOf(parseInt(r));
														if (c > -1) {
															console.log('splicing...' + key)
															$this.track[key].splice(c, 1)
															console.log($this.track[key]);
														}
													});
												}
											} else {
												if (key !== 'version') {
													if (!isNaN(res[key]) && res[key] > 1) {
														$this.track[key] = res[key];
													}
												}
											}
										}

										if (key == 'updates') {

											this.storage.get('updates').then(storedupdates => {
												if (!storedupdates) { storedupdates = []; }

												for (let k = 0; k < res[key].length; k++) {
													if (!this.matchObj(storedupdates, res[key][k])) {
														storedupdates.push(res[key][k]);
													}
												}
												this.storage.set('updates', storedupdates);
											});
										}
									});
								}

								this.storage.set('track', this.track);
								this.storage.set('lastaccess', this.timestamp);
							}
						}

						if ('client_secret' in res) {
							console.log('Fetching client_secret');
							this.settings.client_secret = res.client_secret;
							this.settings.state = res.state;
							this.save_settings();
						}


						this.storage.get('updates').then(storedupdates => {
							if (storedupdates) {
								this.unread_notifications_count = storedupdates.length;
								this.storage.get('readupdates').then(readupdates => {
									if (readupdates) {
										this.unread_notifications_count = storedupdates.length - readupdates.length;
									}
								});
							}
						});
					}
				});

		}
	}
	isString(val) { return typeof val === 'string'; }
	isArray(obj: any): boolean { return Array.isArray(obj); }

	//convert 02/13/2009 23:31:30  to timestamp
	toTimestamp(strDate) {
		var datum = Date.parse(strDate);
		return datum;
	}

	public getUserAuthorizationHeaders() {
		var userheaders = new Headers();
		userheaders.append('Authorization', this.settings.access_token);
		return new RequestOptions({ headers: userheaders });
	}
}
