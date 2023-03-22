import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq/faq.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    MaterialModule,
    MatToolbarModule,
    ComponentsModule
  ]
})
export class FaqModule { }
