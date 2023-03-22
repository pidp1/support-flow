import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classificacao } from 'src/app/models/enums/classificacao';
import { listaProduto } from 'src/app/models/enums/listaProduto';
import { Prioridade } from 'src/app/models/enums/prioridade';
import { Status } from 'src/app/models/enums/status';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { ChamadosService } from 'src/app/services/chamados.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-new-chamado',
  templateUrl: './new-chamado.component.html',
  styleUrls: ['./new-chamado.component.css'],
})
export class NewChamadoComponent implements OnInit{
  public fotoUrl: string = '';

  public isLoadUpload: boolean = false;

  public formNovoChamado: FormGroup;

  public status = Status

  public enumListarProdutos = listaProduto; //primeiro chamamos o enum e atribuimos em uma variavel

  public enumPrioridade = Prioridade

  public enumClassificacao = Classificacao

  public anexos: string[] = []

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
    private fb: FormBuilder,
    private chamadoService: ChamadosService,
    private router: Router,
    private notification: NotificationService,
    private uploadService: UploadService,
    private userService: UserService,
    private dialog: MatDialog

    ) {

    this.formNovoChamado = fb.group({
      produto: ['', [Validators.required]],
      prioridade: ['', [Validators.required]],
      classificacao: ['', [Validators.required]],
      assunto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2000)]],
      anexos: [''],
    });
  }

  ngOnInit(): void {
      this.getUser()
  }

  public criarChamado(): void {
    //primeiro precisa passar pela validação
    this.isLoadUpload = true
    if(this.formNovoChamado.valid){
      const novoChamado:Chamado = this.formNovoChamado.value
      novoChamado.anexos = this.anexos
      let today = new Date(Date.now())
      novoChamado.dataAbertura = today
      novoChamado.arquivar = false
      novoChamado.status = Status.aberto
      novoChamado.usuario = this.usuarioLogado
      this.chamadoService.createChamado(novoChamado).subscribe(response =>{
        this.router.navigate(["/home"])
        this.notification.showMessage("Chamado cadastrado com sucesso!")
      })
    }else{
      this.notification.showMessage("Dados inválidos!")

    }
    this.isLoadUpload = false
  }


  public uploadPhoto(event: any): void{
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
    if (this.anexos.length < 10) {
      this.anexos.push(fotoUrl)
    } else {
      this.notification.showMessage("Limite de arquivos atingido.")
    }
  }
  public delete(i: number): void {
    console.log(i)
    this.anexos?.splice(i, 1)
  }
  public getUser() {
    this.userService.usuarioAtual().subscribe((user: any) => {
      this.userService.findById(user.uid).subscribe(usuario => {
        console.log(usuario)
        this.usuarioLogado = usuario
      } )
    })
  }

  public openDialog(legenda: string): void {
    this.dialog.open(ModalComponent, {
      width: "700px",
      data: legenda
    });
  }

}
