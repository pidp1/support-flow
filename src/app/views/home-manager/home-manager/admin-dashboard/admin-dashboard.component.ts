import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { GridReadyEvent } from 'ag-grid-community/dist/lib/events';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AdminGoogleChartComponent } from 'src/app/components/admin-google-chart/admin-google-chart/admin-google-chart.component';

import { ChamadosService } from '../../../../services/chamados.service';
import { Chamado } from 'src/app/models/interfaces/chamado';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {

  public rowData: Chamado[] = [];

  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true
   };

  public columnDefs:ColDef[] = [
    {
      headerName: "ID",
      field: "idSimples",
      sortable: true,
      filter: true,
      minWidth: 80,
      maxWidth: 100
    },
    {
      headerName: "Usuário (solicitante)",
      field: "usuario.displayName",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: "Email",
      field: "usuario.email",
      sortable: true,
      filter: true,
      minWidth: 130
    },
    {
      headerName: "Produto",
      field: "produto",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: "Responsável",
      field: "responsavel.displayName",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 250
    },
    {
      headerName: "Situação",
      field: "status",
      sortable: true,
      filter: true,
      minWidth: 130,
      maxWidth: 150
    },
    {
      headerName: "Prioridade",
      field: "prioridade",
      sortable: true,
      filter: true,
      minWidth: 130,
      maxWidth: 150
    },
    {
      headerName: "Classificação",
      field: "classificacao",
      sortable: true,
      filter: true,
      minWidth: 130,
      maxWidth: 150
    },
    {
      headerName: "Assunto",
      field: "assunto",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 500
    },
    {
      headerName: 'Data Abertura',
      field: "dataAbertura",
      sortable: true,
      valueFormatter: function (params) {
        let date = params.data.dataAbertura.toDate()
        return moment(date).format('D MMM YYYY HH:mm');
      },
      filter: true,
      minWidth: 150,
      maxWidth: 200
 //dependencia MOMENT is a popular JavaScript library for working with dates and times.

 //the "date-column" component provided by the library to display timestamp values
 //The specific version being installed, "2.29.4", was released on August 3, 2021.
 //This version of moment has various features like parsing, validating, manipulating, and formatting dates. It also provides a simple way to display the relative time (e.g. "3 days ago").
 //It can be used both in the browser and in Node.js.
    }
  ];


    public themes = {
      dark: "ag-theme-alpine-dark",
      light: "ag-theme-alpine"
    };

    public theme: string = this.themes.dark

  constructor(private chamadoService: ChamadosService,
    private dialog: MatDialog) { }

    ngOnInit(): void {
    this.initializeFields()
  }


  public initializeFields():void{
    this.chamadoService.findAll().subscribe((chamados) => {
      this.rowData = chamados;
      console.log(chamados)
  })}


  public onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }


  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  public changeTheme(): void {
    if(this.theme == this.themes.dark){
      this.theme = this.themes.light
    }else{
      this.theme = this.themes.dark;
    }
  }

  public openGraphs(): void {
    this.dialog.open(AdminGoogleChartComponent, {
      width: 'auto',
      height: '850px',
      data: this.rowData
    })
  }
}
