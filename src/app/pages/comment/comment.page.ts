import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  commentForm: FormGroup;
  formValue : Comment;

  formErrors = {
    'author': '',
    'comment' : ''
  };

  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Last Name is required.'
    }
  };

  constructor(private modalCtrl :ModalController,
    private formBuilder: FormBuilder) {
      this.commentForm = this.formBuilder.group({
        author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        rating: 5,
        comment: ['',Validators.required],
        date : ''
      });
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss(this.formValue);
  }

  onSubmit() {
    let d = new Date();
    console.log(this.commentForm.value);
    this.formValue = this.commentForm.value;
    this.formValue.date = d.toISOString();
    this.modalCtrl.dismiss(this.formValue);
  }

}
