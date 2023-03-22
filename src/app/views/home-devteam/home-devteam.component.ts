import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DetalhesChamadoComponent } from 'src/app/components/detalhes-chamado/detalhes-chamado.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { InteracaoComponent } from 'src/app/components/interacao/interacao.component';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { HomeDevTeam } from 'src/app/models/interfaces/home-devteam';
import { ChamadosService } from 'src/app/services/chamados.service';
import { ResponsavelComponent } from 'src/app/components/responsavel/responsavel.component';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { MatSort } from '@angular/material/sort';
import { Status } from 'src/app/models/enums/status';
import { listaProduto } from 'src/app/models/enums/listaProduto';
import { Prioridade } from 'src/app/models/enums/prioridade';
import { Classificacao } from 'src/app/models/enums/classificacao';
import { RejectComponent } from 'src/app/components/reject/reject.component';
import { RelatorioComponent } from 'src/app/components/relatorio/relatorio.component';

@Component({
  selector: 'app-home-devteam',
  templateUrl: './home-devteam.component.html',
  styleUrls: ['./home-devteam.component.css']
})
export class HomeDevteamComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  prioridade: any;
  dataSource:any = []
  displayedColumns = ['chamado', 'prioridade', 'assunto', 'dataAbertura', 'status','assign','detalhes', 'interacao','historico', 'rejeitar','sortIndex'];
  spinner: boolean = true
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
  
  public usuarioLogado: Usuario = {
    displayName: "",
    accessLevel: "",
    email: "",
    password: "",
    photoURL: "",
    cpf: "",
    telefone: 0
  };

  constructor(
    private chamadoService: ChamadosService,
    private dialog: MatDialog,
    private userService: UserService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getUser();
  }
  
  public getUser() {
    this.userService.usuarioAtual().subscribe((user: any) => {
      this.userService.findById(user.uid).subscribe(usuario => {
        this.usuarioLogado = usuario
        this.initializeFields();
      })
    })
  }
  
  public initializeFields() :void{
    this.chamadoService.findAllByResponsibleId(this.usuarioLogado.id || '').subscribe((chamados) => {
      this.dataSource = new MatTableDataSource<Chamado>(chamados);
      this.dataSource.sort = this.sort
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });

}

  public openDetails(chamado:Chamado): void {
    this.dialog.open(DetalhesChamadoComponent,{
      width: "700px",
      data: chamado,
    })
  }

  public openInteraction(chamado: Chamado): void {
    this.dialog.open(InteracaoComponent, {
      width: '700px',
      data: chamado,
    });
  }

  public openDialog(legenda: string): void {
    this.dialog.open(ModalComponent, {
      width: "700px",
      data: legenda
    });
  }
  public responsavelDialog(chamado: Chamado): void {
    this.dialog.open(ResponsavelComponent, {
      width: "500px",
      data: chamado      
    })
  }

  public openReport(chamado: Chamado): void {
    this.dialog.open(RelatorioComponent, {
      width: '700px',
      data: chamado,
    });
  }

  public rejectDialog(chamado: Chamado): void{
    this.dialog.open(RejectComponent, {
      width: "500px",
      data: chamado
    })
  }

  public isResponsavelNull(chamado: Chamado): boolean {
    return chamado.responsavel != null;
  }

  public rejectTicket(chamado: Chamado):void{
    this.openInteraction(chamado)
    this.chamado = chamado
    console.log(this.chamado.idSimples);
    this.chamado.status = Status.rejeitado
    this.chamadoService.updateChamado(this.chamado)
  }

  closedTicket(chamado: Chamado):boolean {
    if(chamado.status == "FECHADO" || chamado.status == "REJEITADO") {
      return true;
    }
    else {
      return false;
    }
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
