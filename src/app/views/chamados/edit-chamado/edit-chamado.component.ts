import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classificacao } from 'src/app/models/enums/classificacao';
import { listaProduto } from 'src/app/models/enums/listaProduto';
import { Prioridade } from 'src/app/models/enums/prioridade';
import { Status } from 'src/app/models/enums/status';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-chamado',
  templateUrl: './edit-chamado.component.html',
  styleUrls: ['./edit-chamado.component.css']
})
export class EditChamadoComponent implements OnInit {
  public fotoUrl!: string
  public isLoadUpload: boolean = false;
  public enumListarProdutos = listaProduto;
  public enumPrioridade = Prioridade;
  public enumClassificacao = Classificacao;
  public listaProduto: listaProduto[] = []
  public anexos?: string[] = []
  public chamado: Chamado = {
    usuario: {
      id:"",
      displayName: "",
      email: "",
      password: "",
      photoURL: "",
      accessLevel: "",
      telefone: 0,
      cpf:""
    },
    produto: listaProduto.blog,
    assunto: "",
    descricao: "",
    anexos: [],
    status: Status.aberto,
    prioridade: Prioridade.N1,
    classificacao: Classificacao.acesso,
    dataAbertura: new Date(),
    interacao: [{data: new Date(), mensagem: ""}],
    historico: [{data: new Date(), mensagem: ""}]
  };

  constructor(
    private route: ActivatedRoute,
    private chamadoService: ChamadosService,
    private router: Router,
    private notification: NotificationService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.initilizeFields();
  }

  private initilizeFields(): void {
    console.log("Entrou no initilize")
    const idChamado: string | null = this.route.snapshot.paramMap.get('id');
    if (idChamado != null && idChamado != undefined) {
      this.chamadoService.findById(idChamado).subscribe(chamado => {
        this.chamado = chamado;

        this.anexos = this.chamado.anexos 
       });
    }
  }

  public fecharChamado(): void {
    const chamado: Chamado = this.chamado;
    const email: string | null = sessionStorage.getItem("email");
    const assunto: string = this.chamado.assunto;
    if(email != null){
      if(chamado.usuario?.email == email){
      if(assunto.includes("Concluído")) {
      this.chamado.status = Status.fechado;
      }
      }
    }
  }

  public update(formEdit: NgForm): void {
    if (formEdit.valid) {
      console.log(this.anexos, 'update editar')
      this.chamado.anexos = this.anexos
      this.fecharChamado();
      this.chamadoService.updateChamado(this.chamado)
      this.router.navigate(["/chamados"]);
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadArquivo(event: any): void{
    this.isLoadUpload = true
    const file: File = event.target.files[0]
    if (file.size < 524288000) {
    this.uploadService.uploadArquivo(file).subscribe(uploadResult =>{
      this.isLoadUpload = false;
      const storageRef = uploadResult.ref
      const promiseFileUrl = storageRef.getDownloadURL()
      promiseFileUrl.then((fotoUrl: string)=>{
        console.log(fotoUrl)
        this.fotoUrl = fotoUrl
        this.addFile(fotoUrl)
        console.log('anexos foto',this.anexos)
      })
    })} else {
      this.notification.showMessage("O arquivo atingiu o tamanho máximo.")
    }
  }
  public addFile(fotoUrl:string):void {
    if (this.anexos!.length < 10) {
      this.anexos?.push(fotoUrl)
    } else {
      this.notification.showMessage("Limite de arquivos atingido.")
    }
  }

  public delete(i: number): void {
    console.log(i)
    this.anexos?.splice(i, 1)

  }
  public produtos(): void{
    this.listaProduto = Object.values(listaProduto);
    }
  }


