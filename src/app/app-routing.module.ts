import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './pages/painel/painel.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared-services/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home', component: PainelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'marcacao',
    loadChildren: () => import('./pages/marcacao/marcacao.module').then(m => m.MarcacaoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
