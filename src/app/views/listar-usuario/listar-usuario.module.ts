import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarUsuarioRoutingModule } from './listar-usuario-routing.module';
import { ListarUsuarioComponent } from './listar-usuario.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { TelefonePipe } from 'src/app/pipes/telefone.pipe';


@NgModule({
  declarations: [
    ListarUsuarioComponent,
    CpfPipe,
    TelefonePipe
  ],
  imports: [
    CommonModule,
    ListarUsuarioRoutingModule,
    MaterialModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class ListarUsuarioModule { }
