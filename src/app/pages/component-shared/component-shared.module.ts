import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { RodapeComponent } from './rodape/rodape.component';


@NgModule({
  declarations: [
    AlertComponent,
    RodapeComponent
  ],
  exports: [
    AlertComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentSharedModule { }
