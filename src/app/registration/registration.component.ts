import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import {User} from '../config/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({});
  model: User = {
    id: '',
    name: '',
    surname: '',
    birthday: '',
    gender: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'name',
        templateOptions: {
          label: 'Имя',
          required: true,
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'surname',
        templateOptions: {
          label: 'Фамилия',
          required: true,
        },
      },
    ],
  },
    {
      validators: {
        validation: [
          {name: 'fieldMatch', options: {errorPath: 'passwordConfirm'}},
        ],
      },
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'birthday',
          type: 'input',
          templateOptions: {
            label: 'Дата рождения',
            type: 'date',
            required: true,
          },
        },
        {
          key: 'gender',
          type: 'radio',
          templateOptions: {
            label: 'Пол',
            placeholder: 'Пол',
            required: true,
            options: [
              {value: 'male', label: 'Мужской'},
              {value: 'female', label: 'Женский'},
            ],
          },
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-2',
              type: 'input',
              key: 'login',
              templateOptions: {
                label: 'Имя аккаунта',
                required: true,
              },
            },
            {
              className: 'flex-2  padding-left-0',
              type: 'select',
              key: 'email',
              templateOptions: {
                label: 'email',
                required: true,
                options: [
                  {label: '@mail.ru', value: '@mail.ru'},
                  {label: '@icloud.com', value: '@icloud.com'},
                  {label: '@bk.ru', value: '@bk.ru'},
                  {label: '@list.ru', value: '@list.ru'}
                ],
              },
            },
          ],
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
          key: 'phone',
          type: 'input',
          templateOptions: {
            label: 'Телефон',
            placeholder: '+7-xxx-xxx-xx-xx',
            addonLeft: {
              text: '+7',
            },
            required: true,
          },
        },

      ],
    }];


  constructor(
    private fire: FirebaseService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.fire.firebaseCrate(this.model);
    this.router.navigate(['/']).finally(undefined);
  }
}
