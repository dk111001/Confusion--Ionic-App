import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


import { User } from '../../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';
  image2: string = 'assets/images/logo2.png';

  user : User;
  constructor(private modalCtrl : ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private file :File) { 

    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
    });

  }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.modalCtrl.dismiss(this.registerForm.value);
    this.dismiss();
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 300,
      targetWidth: 300,
      correctOrientation: true,  //properly oriented with application
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {

      //this.image = this.image2;
      console.log(imageData);
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
         //then use the method reasDataURL  btw. var_picture is ur image variable
      this.file.readAsDataURL(path, filename).then(res=> this.image = res  );
    }, (err) => {
        console.log('Error obtaining picture')
    });
  }

}
