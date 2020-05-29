import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcacaoRoutingModule } from './marcacao-routing.module';
import { ComponentSharedModule } from '../component-shared/component-shared.module';
import { MarcacaoListComponent } from './marcacao-list/marcacao-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { TagFormat } from './tag-format-pipe';


@NgModule({
  declarations: [
    MarcacaoListComponent,
    TagFormat
  ],
  exports: [
    MarcacaoListComponent
  ],
  imports: [
    CommonModule,
    MarcacaoRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    FormsModule,
    ComponentSharedModule
  ]
})
export class MarcacaoModule { }
