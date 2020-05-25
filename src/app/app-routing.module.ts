import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './pages/painel/painel.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PainelComponent },
  { path: 'marcacao', loadChildren: () => import('./pages/marcacao/marcacao.module').then(m => m.MarcacaoModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule) }
  //{ path: 'painel', component: PainelComponent },
  //{ path: 'empresas', loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
