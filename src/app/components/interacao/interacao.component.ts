import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/enums/status';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { Interacao } from 'src/app/models/interfaces/interacao';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { ChamadosService } from 'src/app/services/chamados.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { doc, Firestore, onSnapshot } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-interacao',
  templateUrl: './interacao.component.html',
  styleUrls: ['./interacao.component.css']
})
export class InteracaoComponent implements OnInit {

  public formNovaMensagem: FormGroup

  public isLoadUpload: boolean = false;

  public arquivoUrl: string = '';

  public nomeArquivo: string = ""

  public showName: boolean = false

  public anexos: string[] = []

  public arrayInteracao: Interacao[] = []

  public items: any[] = []


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
    private chamadosService: ChamadosService,
    private userService: UserService,
    private uploadService: UploadService,
    private db: AngularFirestore,
    ) { 
      db.collection('items').valueChanges().subscribe(data => {
        this.items = data;
        this.reverseInteracao();
      });
      this.formNovaMensagem = fb.group({
        mensagem: [""]
      })
    }

  ngOnInit(): void {
    this.getUser();
    this.reverseInteracao()
  }


  public getUser() {    
    this.userService.usuarioAtual().subscribe((user: any) => {
      this.userService.findById(user.uid).subscribe(usuario => {
        this.usuarioLogado = usuario
      })
    })
  }

  public enviarMensagem() {
    this.showName = false
    let mensagemForm: Interacao = this.formNovaMensagem.value
    this.formNovaMensagem = this.fb.group({
      mensagem: ["", [Validators.required, Validators.minLength(0)]]
    })
    mensagemForm.data = new Date().valueOf()
    mensagemForm.usuario = this.usuarioLogado
    mensagemForm.arquivo = this.anexos
    console.log(this.arquivoUrl)
    console.log(mensagemForm.usuario)
    this.chamado.interacao.unshift(mensagemForm)
    this.chamadosService.updateChamado(this.chamado)
    this.anexos = []
  }

  public verificaDate(dataDesconhecida: any) {
    if (typeof dataDesconhecida === 'object') {
      return dataDesconhecida.toDate()
    } else if (typeof dataDesconhecida != 'object') {
      return dataDesconhecida
    } else {
      return ("Data desconhecida")
    }
  }

  public uploadArquivo(event: any): void{
    this.isLoadUpload = true 
    const file: File = event.target.files[0]
    this.uploadService.uploadArquivo(file).subscribe(uploadResult =>{
      this.isLoadUpload = false;
      const storageRef = uploadResult.ref
      const promiseFileUrl = storageRef.getDownloadURL()
      promiseFileUrl.then((arquivoUrl: string)=>{
        this.arquivoUrl = arquivoUrl
        this.addFile(arquivoUrl)

      })
    })
  }

  public anexado(event: any): void{
      this.nomeArquivo = event.target.files[0].name;
      this.showName = true
  }

  public addFile(arquivoUrl:string):void {
    console.log(this.anexos,'estou aqui, é o anexos')
    this.anexos.push(arquivoUrl)
  }
  disableInteraction(chamado: Chamado): boolean{
    if(chamado.status == Status.fechado || chamado.status == Status.rejeitado || chamado.status == Status.arquivado) {
      return true
    }
    return false
  }

  public reverseInteracao() {
    this.arrayInteracao = []
    for(let i = this.chamado.interacao.length; i != 0; i--) {
      this.arrayInteracao.push(this.chamado.interacao[i - 1])
    }
    console.log(this.arrayInteracao)
  }

  public changes () {
    this.db.collection('items').doc(this.chamado.idChamado).valueChanges()
  }

//   public promise = this.firestore.collection("chamados")
//   public unsub = onSnapshot(doc(this.promise, "interacao"), (doc) => {
//     console.log("Current data: ", doc.data());
// });


}
