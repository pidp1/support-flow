import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewChamadoComponent } from '../chamados/new-chamado/new-chamado.component';
import { HomeManagerComponent } from './home-manager.component';
import { AdminDashboardComponent } from './home-manager/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeManagerComponent
  },
  {
    path: 'dash',
    component: AdminDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeManagerRoutingModule { }
