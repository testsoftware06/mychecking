import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentSharedModule } from '../component-shared/component-shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    FormsModule,
    ComponentSharedModule
  ]
})
export class LoginModule { }
