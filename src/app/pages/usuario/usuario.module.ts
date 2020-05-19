import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { ComponentSharedModule } from '../component-shared/component-shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  exports: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentSharedModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
