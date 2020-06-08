import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';


import { LoginPage } from './pages/login/login.page'

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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByName('white');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
    //     this.newComment = data['data']; 
    //     console.log('Dish-detail '); // Here's your selected user!
    //     console.log(data);
    //     if(this.newComment){
    //       this.dish.comments.push(this.newComment);
    //       this.dishservice.putDish(this.dish)
    //       .subscribe(dish => {
    //       this.dish = dish;
    //           },
    //       errmess => { this.dish = null; this.errMess = <any>errmess; });
    //     }
    });
    await modal.present();
    
  }
}
