import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';


import { Network } from '@ionic-native/network/ngx';


import { LoginPage } from './pages/login/login.page'
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(IonRouterOutlet, {static:false})
  routerOutlet : IonRouterOutlet;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'home'
    },
    {
      title: 'About Us',
      url: '/aboutus',
      icon: 'information-circle'
    },
    {
      title: 'Contact Us',
      url: '/contactus',
      icon: 'person-circle'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'list'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private loadingCtrl : LoadingController,
    private router: Router,
    private network: Network,
    private loading : LoadingService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByName('white');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      

      this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
        this.router.navigate(['/network-error']);

      

      });
      
      // stop disconnect watch
      //disconnectSubscription.unsubscribe();
      
      
      // watch network for a connection
      this.network.onConnect().subscribe(() => {
        this.router.navigate(['']);
        // We just got a connection but we need to wait briefly
         // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        //this.loadingCtrl.dismiss();
        
      });
      //connectSubscription.unsubscribe();
      
      
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  async loginModal(){
    this.selectedIndex = -1;
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    modal.onDidDismiss()
     .then((data) => {
       this.selectedIndex = 0;
    });
    await modal.present();
    
  }
}
