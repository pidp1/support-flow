import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY, combineLatest } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Chamado } from '../models/interfaces/chamado';
import { UserService } from './user.service';
import { Usuario } from '../models/interfaces/usuario';
import { Interacao } from '../models/interfaces/interacao';
import { diff } from 'deep-diff';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  router: any;

  public usuarioSistema: Usuario = {
    displayName: "Mensagem Automática",
    email: "",
    password: "",
    accessLevel: "USER",
    cpf: "",
    telefone: 0,
    photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxGhXTEp-G9Z1SBNez2KK6gAeeIbMfRgz-FQ&usqp=CAU"
  }
  
  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
    private userService: UserService,
    private functions: AngularFireFunctions
  ) { }

  public createChamado(chamado: Chamado): Observable<any> {
    chamado = this.atribuiPrimeiraInteracao(chamado,"Chamado aberto em: ")
    const promise = this.firestore.collection("chamados").add(chamado).then(ref =>{
      const chamado2:Chamado = chamado
      chamado2.idChamado = ref.id
      this.firestore.collection("chamados").doc(ref.id).update(chamado2)
      this.generateSimpleId(chamado2)
      this.sortIndexCalculator(chamado2)
    });
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public atribuiPrimeiraInteracao(chamado: Chamado, mensagem: string): Chamado {
      chamado.interacao = [{data: new Date(), mensagem: `${mensagem} ${chamado.dataAbertura.toLocaleDateString()} ${chamado.dataAbertura.toLocaleTimeString()}`, usuario: this.usuarioSistema}]
      chamado.historico = [{data: new Date(), mensagem: `${mensagem} ${chamado.dataAbertura.toLocaleDateString()} ${chamado.dataAbertura.toLocaleTimeString()}`, usuario: this.usuarioSistema}]
    return chamado
  }

  public atribuiOutrasInteracoes(chamado: Chamado, mensagem: string): Chamado {
    console.log("chegou no interacoes")
    let interacao: Interacao
    let usuarioSistema: Usuario
    this.userService.findById("JKbQB0YNnVTP8vDDPELw59KDjU93").subscribe(usuarioSistemaResponse => {
      usuarioSistema = usuarioSistemaResponse
      interacao.mensagem = `${mensagem} ${chamado.dataAbertura.toLocaleDateString()} ${chamado.dataAbertura.toLocaleTimeString()}`
      interacao.data = new Date().valueOf()
      interacao.usuario = usuarioSistema
      chamado.interacao.push(interacao)
      // chamado.interacao.push({data: new Date(), mensagem: `${mensagem} ${chamado.dataAbertura.toLocaleDateString()} ${chamado.dataAbertura.toLocaleTimeString()}`, usuario: usuarioSistema})
      // console.log(chamado.interacao[1],"interacaoadd0")
    })
    return chamado
  }


  public generateSimpleId(chamado: Chamado) {
    this.findAll().subscribe(response => {
      chamado.idSimples = response.length
      this.sendEmailDevs(chamado)
      this.firestore.collection("chamados").doc(chamado.idChamado).update(chamado)
    })
  }
  
  public findAll(): Observable<any> {
    const promise = this.firestore.collection("chamados").get();
    return from(promise).pipe(
      
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const chamado: Chamado = doc.data() as Chamado;
          chamado.idChamado = doc.id;
          return chamado;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id?: string): Observable<any> {
    const promise = this.firestore.collection("chamados").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const chamado: Chamado = doc.data() as Chamado;
        chamado.idChamado = doc.id;
        return chamado;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }
  
  public findAllByUser(id: any): Observable<any> {
    return this.firestore.collection('chamados', ref => ref.where('usuario.id', '==', id)).valueChanges().pipe(
      tap(response => {
        return response
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findAllByResponsibleId(id: string): Observable<any> {
    return this.firestore.collection('chamados', ref => ref.where('responsavel.id', '==', id).where('arquivar', '==', false)).valueChanges().pipe(
      tap(response => {
        return response
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id do responsável");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findAllArchived(id: any): Observable<any> {
    const arquivados = this.firestore.collection('chamados', ref =>
      ref
      .where('arquivar', '==', true)
      .where('usuario.id', '==', id)
      ).valueChanges();
      return arquivados
  }

  public findAllNotArchived(): Observable<any> {
    const arquivados = this.firestore.collection('chamados', ref =>
      ref
      .where('arquivar', '==', false)
      ).valueChanges();
      return arquivados
  }

  public hideAllArchived(id: any): Observable<any> {
    const arquivados = this.firestore.collection('chamados', ref =>
     ref
    .where('usuario.id', '==', id)
    .where('arquivar', '==', false)).valueChanges()
    return arquivados
  }

  public deleteChamado(id: string) {
    const promise = this.firestore.collection("chamados").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }
  
  public updateChamado(chamado: Chamado) {
    this.findById(chamado.idChamado).subscribe((response: Chamado) => {
      const chamadoAntigo = response 
      this.compareChamado(chamado, chamadoAntigo)
      const promise = this.firestore.collection("chamados").doc(chamado.idChamado).update(chamado);
      return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    ).subscribe(()=> {
      this.notification.showMessage("Chamado editado.");
    })
    })
  }
  

  public compareChamado(chamado: Chamado, chamadoAntigo: Chamado){
    const differences = diff(chamado,chamadoAntigo)

    let mudancasLista: string[] = []
    let alteracao: string = ""

    for(let i = 0; i < differences!.length; i ++) {
      alteracao = ` O campo ${differences![i].path![0]} foi alterado `
      console.log("o campo", differences![i].path![0])
      mudancasLista.push(alteracao)
    }
    console.log(mudancasLista, "antes do join")

    let interacao: Interacao = {
      mensagem: "",
      data: new Date().valueOf(),
      usuario: this.usuarioSistema,
      mudancas: mudancasLista
    }

    chamado.historico.unshift(interacao)
    this.firestore.collection("chamados").doc(chamado.idChamado).update(chamado)
  }



  public sortIndexCalculator(chamado: Chamado) {
    const date: Date = new Date();
    if (chamado.prioridade == "N1") {
      chamado.sortIndex = 3 * chamado.dataAbertura.getTime();
    } else if (chamado.prioridade == "N2") {
      chamado.sortIndex = 2 * chamado.dataAbertura.getTime();
    } else if (chamado.prioridade == "N3") {
      chamado.sortIndex = 1 * chamado.dataAbertura.getTime();
    }
    this.firestore.collection("chamados").doc(chamado.idChamado).update(chamado)
  }

  public sendEmailDevs(chamado: Chamado) {
    this.userService.findByAccess("DEV").subscribe(response => {
      const devsArray: Usuario[] = response
      const emailArray: string[] = []

      for(let i = 0; i < devsArray.length; i ++){
        emailArray.push(devsArray[i].email)
      }

      const mailOptions = {
        to: emailArray,
        subject: `Prioridade ${chamado.prioridade} | Chamado aberto - ID ${chamado.idSimples} `,
        html: `<body>Prezado(a), <br>

        Este é um aviso de que um chamado foi aberto em nosso sistema com o ID ${chamado.idSimples}. <br><br>
        
        <strong>Detalhes do chamado:</strong> <br>
            <ul>
            <li>Data e hora de abertura: ${moment(chamado.dataAbertura).format('D MMM YYYY HH:mm')}</li>
            <li>Assunto: ${chamado.assunto}</li>
            <li>Prioridade: ${chamado.prioridade}</li>
            <li>Classificação: ${chamado.classificacao}</li>
            <li>Produto: ${chamado.produto}</li>
            </ul>
        
        Atenciosamente,<br>
        O Sistema.
        </body>` 
    }
      this.functions.httpsCallable('sendEmailNotification')(mailOptions).subscribe((response: any) => {
        console.log(response, "enviado")
      })
    })
  }

}
