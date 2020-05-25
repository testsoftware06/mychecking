import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { PainelComponent } from './pages/painel/painel.component';
import { ComponentSharedModule } from './pages/component-shared/component-shared.module';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './pages/component-shared/nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentSharedModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
