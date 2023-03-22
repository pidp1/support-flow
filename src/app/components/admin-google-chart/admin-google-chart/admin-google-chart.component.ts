import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { push } from 'firebase/database';
import { filter } from 'rxjs';
import { Chamado } from '../../../models/interfaces/chamado';
import { listaProduto } from 'src/app/models/enums/listaProduto';
import { Classificacao } from '../../../models/enums/classificacao';
import { Prioridade } from '../../../models/enums/prioridade';
import { Status } from 'src/app/models/enums/status';


@Component({
  selector: 'app-admin-google-chart',
  templateUrl: './admin-google-chart.component.html',
  styleUrls: ['./admin-google-chart.component.css']
})
export class AdminGoogleChartComponent implements OnInit {

  public produtoLenght: number[] = [];
  public classificacaoLenght: number[] = [];
  public prioridadeLenght: number[] = [];
  public statusLenght: number[] = [];


  public produtoChart!: GoogleChartInterface;
  public classificacaoChart!: GoogleChartInterface;
  public prioridadeChart!: GoogleChartInterface;
  public statusChart!: GoogleChartInterface;

  constructor(@Inject(MAT_DIALOG_DATA) public chamado: Chamado[]) { }

  ngOnInit(): void {
    this.produtoList()
    this.classificacao()
    this.prioridade()
    this.status()
  }

  public produtoList(): void {
    const produtoEnum = Object.values(listaProduto)
    const produtoList: string[] = this.chamado.map(chamado => {
      return chamado?.produto
    })
    let soulMath: number = 0;
    let soulOn: number = 0;
    let teachable: number = 0;
    let processoSeletivo: number = 0;
    let intranet: number = 0;
    let dashboard: number = 0;
    let blog: number = 0;
    let site: number = 0;
    let plataformaDinamica: number = 0;

    for(let element of produtoList){
      if(element == produtoEnum[0]){
        soulMath++;
      }else if(element == produtoEnum[1]){
        soulOn++;
      }else if(element == produtoEnum[2]){
        teachable++;
      }else if(element == produtoEnum[3]){
        processoSeletivo++;
      }else if(element == produtoEnum[4]){
        intranet++;
      }else if(element == produtoEnum[5]){
        dashboard++;
      }else if(element == produtoEnum[6]){
        blog++
      }else if(element == produtoEnum[7]){
        site++
      }else{
        plataformaDinamica++
      }
    }
    this.produtoLenght.push(soulMath,
                            soulOn,
                            teachable,
                            processoSeletivo,
                            intranet,
                            dashboard,
                            blog,
                            site,
                            plataformaDinamica)
    //console.log(this.produtoLenght)
    this.rendererProdutoGraph()
  }

  public rendererProdutoGraph(){
    this.produtoChart = {
      chartType: GoogleChartType.PieChart,
      dataTable: [
        ['Produto',
         'Quant',
         { role: 'style' }
        ],
        ['SOUL MATCH',
          this.produtoLenght[0],
          '#0042ae'
        ],
        ['SOUL ON',
          this.produtoLenght[1],
          '#7abf66'
        ],
        ['TEACHABLE',
          this.produtoLenght[2],
          '#e0440e'
        ],
        ['PROCESSO SELETIVO',
          this.produtoLenght[3],
          '#e9d558'
        ],
        ['INTRANET',
          this.produtoLenght[4],
          '#7d00a5'
        ],
        ['DASHBOARD',
          this.produtoLenght[5],
          '#f4065e'
        ],
        ['BLOG',
          this.produtoLenght[6],
          '#f3b49f'
        ],
        ['SITE',
          this.produtoLenght[7],
          '#760000'
        ],
        ['PLATAFORMA DINAMICA',
          this.produtoLenght[8],
          '#0abfbc'
        ],
      ],
      //firstRowIsData: true,
      options: {
        width: 750,
        height: 350,
       'title': 'Produto',
       colors: ['#0042ae', '#7abf66', '#e0440e', '#e9d558', '#7d00a5', '#f4065e','#f3b49f', '#760000','#0abfbc'],
       is3D: true
      },
    }
  }


  public classificacao(): void {
    const classificacaoEnum = Object.values(Classificacao)
    const classificacao: string[] = this.chamado.map(chamado => {
      return chamado?.classificacao
    })
    let melhoria: number = 0;
    let bug: number = 0;
    let duvida: number = 0;
    let acesso: number = 0;

    for(let element of classificacao){
      if(element == classificacaoEnum[0]){
        melhoria++;
      }else if(element == classificacaoEnum[1]){
        bug++;
      }else if(element == classificacaoEnum[2]){
        duvida++
      }else{
        acesso++
      }
    }
    this.classificacaoLenght.push(melhoria,
                                  bug,
                                  duvida,
                                  acesso)
    //console.log(this.classificacaoLenght)
    this.rendererClassificacaoGraph()
  }

  public rendererClassificacaoGraph(){
    this.classificacaoChart = {
      chartType: GoogleChartType.PieChart,
      dataTable: [
        ['Classificação',
         'Quant',
         { role: 'style' }
        ],
        ['MELHORIA',
          this.classificacaoLenght[0],
         '#770493'
        ],
        ['BUG',
          this.classificacaoLenght[1],
          '#ce0930'
        ],
        ['DÚVIDA',
          this.classificacaoLenght[2],
          '#1c31a5'
        ],
        ['ACESSO',
          this.classificacaoLenght[3],
          '#ffa566'
        ],
        ],
      //firstRowIsData: true,
      options: {
        width: 750,
        height: 350,
        'title': 'Classificação do Chamado',
        colors: ['#770493','#ce0930', '#1c31a5','#ffa566'],
        is3D: true
      },
    }
  }


  public prioridade(): void {
    const prioridadeEnum = Object.values(Prioridade)
    const prioridade: string[] = this.chamado.map(chamado => {
      return chamado?.prioridade
    })
    let n1: number = 0;
    let n2: number = 0;
    let n3: number = 0;

    for(let element of prioridade){
      if(element == prioridadeEnum[0]){
         n1++;
      }else if(element == prioridadeEnum[1]){
         n2++;
      }else{
         n3++
      }
    }
    this.prioridadeLenght.push(n1, n2, n3)
      console.log(this.classificacaoLenght)
      this.rendererPrioridadeGraph()
  }

  public rendererPrioridadeGraph(){
    this.prioridadeChart = {
      chartType: GoogleChartType.PieChart,
      dataTable: [
        ['Prioridade',
         'Nivel',
         { role: 'style' }
        ],
        ['N1',
          this.prioridadeLenght[0],
          '#83a300'
        ],
        ['N2',
          this.prioridadeLenght[1],
          '#fecd23'
        ],
        ['N3',
          this.prioridadeLenght[2],
          '#e50e0e'
        ],
      ],
      //firstRowIsData: true,
      options: {
        width: 750,
        height: 350,
        pieHole: 0.4,
        'title': 'Prioridade do Atendimento',
        colors: [ '#83a300','#fecd23','#e50e0e'],
        is3D: true
      },
    }
  }


  public status(): void {
    const statusEnum = Object.values(Status)
    const status: string[] = this.chamado.map(chamado => {
      return chamado?.status
    })
    let aFazer: number = 0;
    let aberto: number = 0;
    let emResolucao: number = 0;
    let fechado: number = 0;
    let rejeitado: number = 0;
    let arquivado: number = 0;

    for(let element of status){
      if(element == statusEnum[0]){
        aFazer++;
      }else if(element == statusEnum[1]){
        aberto++;
      }else if(element == statusEnum[2]){
        emResolucao++;
      }else if(element == statusEnum[3]){
        fechado++;
      }else if(element == statusEnum[4]){
        rejeitado++;
      }else{
        arquivado++;
      }
    }
    this.statusLenght.push(aFazer,
                            aberto,
                            emResolucao,
                            fechado,
                            rejeitado,
                            arquivado)
    //console.log(this.statusSituacaoLenght)
    this.rendererStatusGraph()
  }

  public rendererStatusGraph(){
    this.statusChart = {
      chartType: GoogleChartType.PieChart,
      dataTable: [
        ['Status',
         'Quant',
         { role: 'style' }
        ],
        ['A FAZER',
          this.statusLenght[0],
          '#bd374c'
        ],
        ['ABERTO',
          this.statusLenght[1],
          '#0e974f'
        ],
        ['EM RESOLUÇÃO',
          this.statusLenght[2],
          '#1c31a5'
        ],
        ['FECHADO',
          this.statusLenght[3],
          '#360c2b'
        ],
        ['REJEITADO',
          this.statusLenght[4],
          '#f0823f'
        ],
        ['ARQUIVADO',
          this.statusLenght[5],
          '#f4065e'
        ],
      ],
      //firstRowIsData: true,
      options: {
        width: 750,
        height: 350,
       'title': 'Status do Atendimento',
       colors: ['#bd374c','#0e974f','#1c31a5','#360c2b', '#f0823f', '#f4065e'],
       is3D: true
      },
    }
  }
}
