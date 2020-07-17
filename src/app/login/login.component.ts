import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {LogDataService} from '../services/log-data.service';

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

  constructor(private check: LogDataService) {
  }

  dataSaver(): void {
    if (this.model.checkbox) {
      localStorage.setItem('key', JSON.stringify(this.model));
    }
    if (this.check.checkId(this.model)) {
      console.log('Этого гуся мы знаем');
      this.check.showData(this.model);
    } else {
      console.log('Залетный фраер');
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
