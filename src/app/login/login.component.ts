import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {LogDataService} from '../services/log-data.service';
import {Router} from '@angular/router';
import {LockalStorageManegmentService} from '../services/lockal-storage-manegment.service';
import {USER_INFO} from '../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  constructor(
    private check: LogDataService,
    private router:  Router,
    private saveStorage: LockalStorageManegmentService
  ) {

  }


  onSubmit(): void {

    if (this.model.checkbox) {
      this.saveStorage.save(this.model, USER_INFO)
    }
    const user = this.check.checkId(this.model)
    console.log(user);
    if (user) {
      console.log('Этого гуся мы знаем', user.personData);
      this.router.navigate(['home']).finally(undefined)
      // this.check.showData(this.model);
    } else {
      console.log('Залетный фраер');
    }
    this.form.reset();
  }

  ngOnInit(): void {
    const startData = this.saveStorage.load(USER_INFO);
    if (!startData) {
      return;
    }
    this.model = JSON.parse(startData);
  }

}
