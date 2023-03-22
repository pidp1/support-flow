import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { listaProduto } from 'src/app/models/enums/listaProduto';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { ChamadosService } from 'src/app/services/chamados.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/models/enums/status';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public formResponsavel: FormGroup
  public devs: Usuario[] = []
  public listaProduto: listaProduto[] = []
  public usuarioLogado: Usuario = {
    displayName: "",
    accessLevel: "",
    email: "",
    password: "",
    photoURL: "",
    cpf: "",
    telefone: 0
  }
  public responsavel: Usuario = {
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
  ) {
    {
      this.formResponsavel = fb.group({ responsavel: ["", [Validators.required]] })
    }
  }

  ngOnInit(): void {
    this.getUser()
    this.FindbyAccess()
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

  public assinar(): void {
    this.chamado.responsavel = this.usuarioLogado
    this.chamadoService.updateChamado(this.chamado)
  }

  public assinalar(): void {
    if(this.responsavel.accessLevel == "DEV"){
    this.chamado.responsavel = this.responsavel
    this.chamado.status = Status.aFazer
    this.chamadoService.updateChamado(this.chamado)}
    else{this.notification.showMessage("Selecione um responsável para continuar")}
  
  }

  public FindbyAccess(): void {
    this.userService.findByAccess('DEV').subscribe(response => {
      this.devs = response
    });
  }
}

