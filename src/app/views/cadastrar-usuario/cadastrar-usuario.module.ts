import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrarUsuarioRoutingModule } from './cadastrar-usuario-routing.module';
import { CadastrarComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../../components/components.module";
import { TelefonePipe } from 'src/app/pipes/telefone.pipe';


@NgModule({
    declarations: [
        CadastrarComponent,
        
    ],
    imports: [
        CommonModule,
        CadastrarUsuarioRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        MaterialModule,
        FormsModule,
        MatTableModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,

    ]
})
export class CadastrarUsuarioModule {}
