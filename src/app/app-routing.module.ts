import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth.guard';
import { DevGuard } from './guards/dev.guard';
import { ManagerGuard } from './guards/manager.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'chamados',
    loadChildren: () =>
      import('./views/chamados/chamados.module').then((m) => m.ChamadosModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home-standard/home-standard.module').then(
        (m) => m.HomeStandardModule
      ),
    canActivate: [AuthGuardGuard],
  },

  {
    path: "faq",
    loadChildren: () =>
      import('./views/faq/faq.module').then(
        (m) => m.FaqModule
      ),
      canActivate: [AuthGuardGuard],
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('./views/cadastrar-usuario/cadastrar-usuario.module').then(
        (m) => m.CadastrarUsuarioModule
      ),
    canActivate: [ManagerGuard],
  },

  {
    path: 'manager',
    loadChildren: () =>
      import('./views/home-manager/home-manager.module').then(
        (m) => m.HomeManagerModule
      ),
    canActivate: [ManagerGuard],
  },

  {
    path: 'signin',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'devteam',
    loadChildren: () =>
      import('./views/home-devteam/home-devteam.module').then(
        (m) => m.HomeDevteamModule
      ),
      canActivate: [DevGuard]
  },

  {
    path: 'usuarios',
    loadChildren: () =>
      import('./views/listar-usuario/listar-usuario.module').then(
        (m) => m.ListarUsuarioModule
      ),
    canActivate: [ManagerGuard],
  },
  
  {
    path: 'arquivados',

    loadChildren: () =>
      import('./views/chamados/arquivados/arquivados.module').then(
        (m) => m.ArquivadosModule
      ),
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
