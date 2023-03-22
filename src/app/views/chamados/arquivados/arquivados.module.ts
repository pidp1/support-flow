import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ArquivadosComponent } from './arquivados.component';
import { ArquivadosRoutingModule } from './arquivados-routing.module';

@NgModule({
  declarations: [
    ArquivadosComponent
  ],

  imports: [
    CommonModule,
    ArquivadosRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    MaterialModule,
  ]
})
export class ArquivadosModule { }


