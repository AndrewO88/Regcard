import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {LogDataService} from '../services/log-data.service';
import {Router} from '@angular/router';
import {LocalStorageManagementService} from '../services/local-storage-management.service';
import {USER_INFO} from '../config/config';
import {Observable} from 'rxjs';
import {ErrorService} from '../services/error.service';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error$: Observable<string>;

  form = new FormGroup({});
  model: any = {
    login: '',
    email: '',
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
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'email',
          placeholder: 'email',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'password',
          placeholder: 'Must be at least 5 characters',
          required: true,
          minLength: 5,
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
    private router: Router,
    private fire: FirebaseService,
    private saveStorage: LocalStorageManagementService,
    public errSrv: ErrorService,
  ) {
  }

  ngOnInit(): void {
    this.error$ = this.errSrv.error$;
    const startData = this.saveStorage.load(USER_INFO);
    if (!startData) {
      return;
    }
    this.model = JSON.parse(startData);
  }

  onSubmit(): void {
    this.fire.firebaseSignin(this.model).then(data => {
      console.log('user dign in success ', data);
      this.errSrv.error$.next('');
      if (this.model.checkbox) {
        this.saveStorage.save(this.model, USER_INFO);
      }
      this.router.navigate(['home']).finally(undefined);
    }).catch(function(error) {
      console.log('firebase sign in error ', error);
    }).then(() => {
      this.errSrv.error$.next('Залетный фраер');
    });
  }

}
