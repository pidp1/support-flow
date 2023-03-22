import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditChamadoComponent } from './edit-chamado/edit-chamado.component';
import { NewChamadoComponent } from './new-chamado/new-chamado.component';
import { ListaChamadosComponent } from './lista-chamados/lista-chamados.component';
import { DevGuard } from 'src/app/guards/dev.guard';
import { HomeStandardComponent } from '../home-standard/home-standard.component';

const routes: Routes = [

  {
    path:'',
    component: HomeStandardComponent
  },

  {
    path:'new',
    component: NewChamadoComponent
  },
  {
    path: 'edit/:id',
    component: EditChamadoComponent
  },
  {
    path: 'lista',
    component: ListaChamadosComponent,
      canActivate: [ DevGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
