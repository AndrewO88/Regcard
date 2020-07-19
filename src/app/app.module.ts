import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, AbstractControl, FormsModule} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientComponent } from './httpclient/http-client.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {LogDataService} from './services/log-data.service';

export function minlengthValidationMessages(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HttpClientComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        {name: 'fieldMatch', validation: fieldMatchValidator},
      ],
      validationMessages: [
        {name: 'required', message: 'This field is required'},
        {name: 'minlength', message: minlengthValidationMessages},
      ],
    }),
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    FormlyModule.forRoot(),
    MatInputModule
  ],
  providers: [LogDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }





