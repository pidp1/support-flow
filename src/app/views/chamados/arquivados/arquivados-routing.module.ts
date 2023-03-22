import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArquivadosComponent } from './arquivados.component';


const routes: Routes = [
  { path: '',
  component: ArquivadosComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArquivadosRoutingModule { }
