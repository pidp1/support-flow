import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from './../../../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetalhesChamadoComponent } from 'src/app/components/detalhes-chamado/detalhes-chamado.component';
import { InteracaoComponent } from 'src/app/components/interacao/interacao.component';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';
import { UserService } from 'src/app/services/user.service';
import { Status } from 'src/app/models/enums/status';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'src/app/models/interfaces/usuario';

@Component({
  selector: 'app-arquivados',
  templateUrl: './arquivados.component.html',
  styleUrls: ['./arquivados.component.css'],
})
export class ArquivadosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  prioridade: any;

  public usuarioLogado: Usuario = {
    displayName: "",
    accessLevel: "",
    email: "",
    password: "",
    photoURL: "",
    cpf: "",
    telefone: 0
}

  displayedColumns = [
    'chamado',
    'prioridade',
    'assunto',
    'classificacao',
    'dataAbertura',
    'status',
    'assign',
    'detalhes',
    'interacao',
    'sortIndex',
  ];
  dataSource: any = [];
  spinner: boolean = true;
  mostrar: boolean = false;

  constructor(
    private chamadoService: ChamadosService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser()
  }

  public getUser() {   
    this.userService.usuarioAtual().subscribe((user: any) => {
      this.userService.findById(user.uid).subscribe(usuario => {
        this.usuarioLogado = usuario
        this.findAllByUser();
        this.initializeFields() 
      } )
    })
  }
  public findAllByUser():void{
    this.chamadoService.findAllByUser(this.usuarioLogado.id).subscribe(response =>{
    })
  }
 
  public initializeFields(): void {
    this.chamadoService.findAllArchived(this.usuarioLogado.id).subscribe((chamados) => {
      this.dataSource = new MatTableDataSource<Chamado>(chamados);
      this.dataSource.sort = this.sort
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  public openDetails(chamado: Chamado): void {
    this.dialog.open(DetalhesChamadoComponent, {
      width: '700px',
      data: chamado,
    });
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
      data: legenda,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}