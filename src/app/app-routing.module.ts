import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PainelComponent } from './pages/painel/painel.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/marcacao/marcacao.module').then(m => m.MarcacaoModule) },
  //{ path: '', component: AppComponent },
  //{ path: 'painel', component: PainelComponent },
  //{ path: 'empresas', loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaModule) },
  //{ path: 'usuarios', loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
