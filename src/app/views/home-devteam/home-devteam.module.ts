import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDevteamRoutingModule } from './home-devteam-routing.module';
import { HomeDevteamComponent } from './home-devteam.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    HomeDevteamComponent
  ],
  imports: [
    CommonModule,
    HomeDevteamRoutingModule,
    MaterialModule,
    ComponentsModule


  ]
})
export class HomeDevteamModule { }
