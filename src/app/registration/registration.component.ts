import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {ValidIds} from '../services/log-data.service';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({});
  model: ValidIds = {
    id: '',
    login: '',
    password: '',
    passwordConfirm: '',
    personData: {
      name: '',
      address: '',
      email: '',
    }
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
        key: 'personData',
        fieldGroup: [{
          key: 'name',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Name',
          },
        },{
          key: 'address',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Address',
          },
        },{
          key: 'email',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'email',
            label: 'Email',
            maxlength: 10,
            minlength: 6,
            placeholder: "example@example.com"
          },
          // validators: {
          // validation: ['ip'],
          // },
        }],
      },
    ],
  }];


  constructor(
    private fire: FirebaseService,
    private router:  Router,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.fire.createUser(this.model);
    this.router.navigate(['/']).finally(undefined);
}}
