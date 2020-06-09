import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;
  constructor(
    public loadingController: LoadingController
  ) 
  { } 

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Network Disconnected...',
      spinner: 'circles' ,
    
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.getTop().then(a => {
           if ( a )
            a.dismiss().then(() => console.log('loading dismissed'));
        });


  }
}
