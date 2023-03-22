import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManagerRoutingModule } from './home-manager-routing.module';
import { HomeManagerComponent } from './home-manager.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AdminDashboardComponent } from './home-manager/admin-dashboard/admin-dashboard.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    HomeManagerComponent,
    AdminDashboardComponent
  ],

  imports: [
    CommonModule,
    HomeManagerRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    MaterialModule,
    AgGridModule
  ]
})
export class HomeManagerModule { }
