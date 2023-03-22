import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { DetalhesChamadoComponent } from './detalhes-chamado/detalhes-chamado.component';
import { InteracaoComponent } from './interacao/interacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ManagerComponent } from './manager/manager.component';
import { RejectComponent } from './reject/reject.component';
import { StatusComponent } from './status/status.component';
import { EncerrarComponent } from './encerrar/encerrar.component';
import { AdminGoogleChartComponent } from './admin-google-chart/admin-google-chart/admin-google-chart.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ArquivarComponent } from './arquivar/arquivar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    DetalhesChamadoComponent,
    InteracaoComponent,
    RelatorioComponent,
    ModalComponent,
    ResponsavelComponent,
    ManagerComponent,
    RejectComponent,
    StatusComponent,
    EncerrarComponent,
    AdminGoogleChartComponent,
    ArquivarComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule
  ],
  exports: [
    NavBarComponent,
    DetalhesChamadoComponent,
    RelatorioComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
