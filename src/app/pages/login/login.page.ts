import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';


import { User } from '../../shared/user';
import { RegisterPage } from '../register/register.page'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(private modalCtrl : ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage) {
      storage.get('user').then(user => {
        if (user) {
          console.log(user);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username, 
              'password': this.user.password 
            });
        }
        else
          console.log('user not defined');
      });

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['',Validators.required],
        remember: true
      });

     }

  ngOnInit() {
  }

  dismiss(){
    console.log('dismiss login');
    this.modalCtrl.dismiss(true);

  }
  onSubmit() {
    console.log(this.loginForm.value, this.user);
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    console.log(this.user);
    if(this.loginForm.get('remember').value)
      this.storage.set('user', this.user)
    else
      this.storage.remove('user');
    this.modalCtrl.dismiss(true);
  }
  async openRegister(){
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
      
    });
    await modal.present();

    modal.onDidDismiss()
     .then((data) => {
       if(data['data']){
       console.log('data-recieved login');
       this.loginForm
            .patchValue({
              'username': data['data'].username, 
              'password': data['data'].password 
            });
        }
    });
  }

}
