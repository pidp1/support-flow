import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewChamadoComponent } from '../chamados/new-chamado/new-chamado.component';
import { HomeStandardComponent } from './home-standard.component';

const routes: Routes = [
  { path: '', 
  component: HomeStandardComponent 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeStandardRoutingModule { }
