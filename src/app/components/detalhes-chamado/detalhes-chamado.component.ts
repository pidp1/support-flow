import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chamado } from 'src/app/models/interfaces/chamado';

@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.component.html',
  styleUrls: ['./detalhes-chamado.component.css']
})
export class DetalhesChamadoComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public chamado:Chamado) { }

  ngOnInit(): void {
  }

}
