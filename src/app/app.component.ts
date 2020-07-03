import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  template: `<div class="container"><mat-card class="card">
    <h1>Registration</h1><form [formGroup]="form" (ngSubmit)="onSubmit()">
    <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
    <button (click)="dataSaver()" type="submit" [disabled]="form.invalid" mat-raised-button>Confirm</button></form></mat-card>
  </div>
  `,
  styles: [`.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .card {
    width: 500px;
    display: block;
  }`]
})
export class AppComponent implements  OnInit {
  form = new FormGroup({});
  model: any = {
    login: '',
    password: '',
    passwordConfirm: '',
    checkbox: false
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [{
    validators: {
      validation: [
        {name: 'fieldMatch', options: {errorPath: 'passwordConfirm'}},
      ],
    },
    fieldGroup: [
      {
        key: 'login',
        type: 'input',
        templateOptions: {
          label: 'Login',
          placeholder: 'Login',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Must be at least 5 characters',
          required: true,
          minLength: 5,
        },
      },
      {
        key: 'passwordConfirm',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          placeholder: 'Please re-enter your password',
          required: true,
        },
      },
      {
        key: 'checkbox',
        type: 'checkbox',
        templateOptions: {
          label: 'Запомнить меня',
        },
      },
    ],
  }];
  dataSaver(): void {
   if (this.model.checkbox) {
      localStorage.setItem('key', JSON.stringify(this.model));
    }
  }
  onSubmit(): void {
    this.form.reset();
  }
  ngOnInit(): void {
    if (!localStorage.getItem('key')) {
      return;
    }
    const startData = localStorage.getItem('key');
    this.model = JSON.parse(startData);
  }
}
