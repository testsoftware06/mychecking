import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcacaoListComponent } from './marcacao-list/marcacao-list.component';


const routes: Routes = [
  { path: '', component: MarcacaoListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcacaoRoutingModule { }
