import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { PainelComponent } from './pages/painel/painel.component';
import { ComponentSharedModule } from './pages/component-shared/component-shared.module';
import { NavComponent } from './pages/component-shared/nav/nav.component';
import { AuthGuard } from './shared-services/auth.guard';
import { LoginModule } from './pages/login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentSharedModule,
    HttpClientModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
