import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetalhesChamadoComponent } from 'src/app/components/detalhes-chamado/detalhes-chamado.component';
import { ManagerComponent } from 'src/app/components/manager/manager.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ResponsavelComponent } from 'src/app/components/responsavel/responsavel.component';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { ChamadosService } from 'src/app/services/chamados.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.component.html',
  styleUrls: ['./lista-chamados.component.css']
})
export class ListaChamadosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  prioridade: any;
  dataSource:any = []
  displayedColumns = ['chamado','prioridade','assunto', 'classificacao', 'dataAbertura', 'status','assign','detalhes', 'sortIndex'];
  spinner: boolean = true;
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
    private chamadoService: ChamadosService,
    private userService: UserService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getUser()

  }

  public initializeFields(): void {
    this.chamadoService.findAllNotArchived().subscribe((chamados) => {
      this.dataSource = new MatTableDataSource<Chamado>(chamados);
      this.dataSource.sort = this.sort
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  public getUser() {
    this.userService.usuarioAtual().subscribe((user: any) => {
      this.userService.findById(user.uid).subscribe(usuario => {
        this.usuarioLogado = usuario
        this.initializeFields()
      })
    })
  }

  public openDetails(chamado:Chamado): void {
    this.dialog.open(DetalhesChamadoComponent, {
      width: "700px",
      data: chamado
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

  public managerDialog(chamado: Chamado): void {
    this.dialog.open(ManagerComponent, {
      width: "600px",
      data: chamado      
    })
  }

  public isResponsavelNull(chamado: Chamado): boolean {
    return chamado.responsavel != null;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCredentials():boolean {
    if(this.usuarioLogado.accessLevel == "DEV")
    { return true}
    else{return false}
  }

  

}
