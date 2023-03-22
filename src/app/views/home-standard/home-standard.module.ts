import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeStandardRoutingModule } from './home-standard-routing.module';
import { HomeStandardComponent } from './home-standard.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [
    HomeStandardComponent
  ],

  imports: [
    CommonModule,
    HomeStandardRoutingModule,
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
export class HomeStandardModule { }


