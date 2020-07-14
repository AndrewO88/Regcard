import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';

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
    HomeComponent
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, LoginComponent,]
})
export class AppModule { }





