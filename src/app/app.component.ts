import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';


import { Network } from '@ionic-native/network/ngx';


import { LoginPage } from './pages/login/login.page'
import { LoadingService } from './services/loading.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(IonRouterOutlet, {static:false})
  routerOutlet : IonRouterOutlet;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
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
  public mapIndex;

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
    this.mapIndex = new Map<string,number>();
    this.mapIndex.set('/home',0); this.mapIndex.set('/aboutus',1); this.mapIndex.set('/contactus',2); this.mapIndex.set('/menu',3);
    console.log('App compo');
    console.log(this.router.url);
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
    const path = window.location.pathname.split('/')[1];
    console.log('gg')
    console.log(path);
    
  }
  async loginModal(){
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    modal.onDidDismiss()
     .then((data) => {
      console.log('dismiss login app');
      console.log(this.router.url);
    });
    await modal.present();
    
  }
}
