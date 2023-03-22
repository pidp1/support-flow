import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Classificacao } from 'src/app/models/enums/classificacao';
import { Status } from 'src/app/models/enums/status';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  public formStatus: FormGroup
  public status: Status = Status.aFazer
  public enumStatus: String[] = ["ABERTO", "A FAZER", "EM RESOLUÇÃO"]

  constructor(
    @Inject(MAT_DIALOG_DATA) public chamado: Chamado,
    private fb: FormBuilder,
    private chamadoService: ChamadosService,
    private notification: NotificationService,
  ) {
    {
      this.formStatus = fb.group({ status: ["", [Validators.required]] })
    }
  }

  ngOnInit(): void {
  }

  public statusChange(chamado: Chamado): void {
    this.chamado.status = this.status
    this.chamadoService.updateChamado(this.chamado)
  }

}

