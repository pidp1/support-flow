import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { now } from 'moment';
import { DetalhesChamadoComponent } from 'src/app/components/detalhes-chamado/detalhes-chamado.component';
import { InteracaoComponent } from 'src/app/components/interacao/interacao.component';
import { ManagerComponent } from 'src/app/components/manager/manager.component';
import { RelatorioComponent } from 'src/app/components/relatorio/relatorio.component';
import { StatusComponent } from 'src/app/components/status/status.component';
import { Status } from 'src/app/models/enums/status';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';

@Component({
  selector: 'app-home-manager',
  templateUrl: './home-manager.component.html',
  styleUrls: ['./home-manager.component.css']
})
export class HomeManagerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  prioridade: any;
  dataSource:any = []
  displayedColumns = ['chamado', 'prioridade', 'assunto', 'dataAbertura', 'status', 'assign', 'detalhes', 'interacao', 'historico', 'sortIndex'];

  spinner: boolean = true
  public today = new Date(Date.now())
  public fechamento:Date = new Date() 
  constructor (
    private chamadoService: ChamadosService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeFields()
  }
  
  

  public initializeFields():void{
    this.chamadoService.findAll().subscribe((chamados) => {
      this.dataSource = new MatTableDataSource<Chamado>(chamados);
      this.dataSource.sort = this.sort
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }

    });
  }

  public arquivarTempo(chamado: Chamado):void {
        
  }

  public openDetails(chamado:Chamado): void {
    this.dialog.open(DetalhesChamadoComponent, {
      width: "700px",
      data: chamado,
    })
  }

  public openReport(chamado: Chamado): void {
    this.dialog.open(RelatorioComponent, {
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

  public managerDialog(chamado: Chamado): void {
    this.dialog.open(ManagerComponent, {
      width: "600px",
      data: chamado      
    })
  }
  public statusDialog(chamado: Chamado): void {
    this.dialog.open(StatusComponent, {
      width: "600px",
      data: chamado      
    })
  }

  public isResponsavelNull(chamado: Chamado): boolean {
     return chamado.status != Status.aberto
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
