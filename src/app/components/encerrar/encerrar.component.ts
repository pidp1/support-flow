import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Status } from 'src/app/models/enums/status';
import { InteracaoComponent } from '../interacao/interacao.component';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { Interacao } from 'src/app/models/interfaces/interacao';

@Component({
  selector: 'app-encerrar',
  templateUrl: './encerrar.component.html',
  styleUrls: ['./encerrar.component.css']
})
export class EncerrarComponent implements OnInit {

  public justification = true
  public formNovaMensagem: FormGroup

  public usuarioLogado: Usuario = {
    displayName: "",
    accessLevel: "",
    email: "",
    password: "",
    photoURL: "",
    cpf: "",
    telefone: 0
  }


constructor(
  @Inject(MAT_DIALOG_DATA) public chamado: Chamado,
  private fb: FormBuilder,
  private userService: UserService,
  private chamadoService: ChamadosService,
  private route: ActivatedRoute,
  private router: Router,
  private notification: NotificationService,
  private dialog: MatDialog

) {
  this.formNovaMensagem = fb.group({
    mensagem: ["", [Validators.required]]
  })
}

ngOnInit(): void {
  this.getUser()
}

public getUser() {
  this.userService.usuarioAtual().subscribe((user: any) => {
    this.userService.findById(user.uid).subscribe(usuario => {
      this.usuarioLogado = usuario
      this.initilizeFields()
    })
  })
}

private initilizeFields(): void {
  const idChamado: string | null = this.route.snapshot.paramMap.get('id');
  if (idChamado) {
    this.chamadoService.findById(idChamado).subscribe(chamado => {
      this.chamado = chamado;
    });
  }
}

public openInteraction(chamado: Chamado): void {
  this.dialog.open(InteracaoComponent, {
    width: '700px',
    data: chamado,
  });
}

public enviarMensagem() {
  let mensagemForm: Interacao = this.formNovaMensagem.value
  this.formNovaMensagem = this.fb.group({
    mensagem: ["", [Validators.required]]
  })
  mensagemForm.data = new Date().valueOf()
  mensagemForm.usuario = this.usuarioLogado
  console.log(mensagemForm.usuario)
  this.chamado.interacao.unshift(mensagemForm)
  this.chamadoService.updateChamado(this.chamado)
  this.justification = false
}

public closeTicket(chamado: Chamado):void{
  this.openInteraction(chamado)
  this.chamado = chamado
  this.chamado.status = Status.fechado
  this.chamado.sortIndex = this.chamado.sortIndex! * 10
  this.chamado.dataFechamento = new Date(Date.now());
  this.chamadoService.updateChamado(this.chamado)
}

}
