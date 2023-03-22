import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/interfaces/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder,} from '@angular/forms';
@Component({
  selector: 'app-arquivar',
  templateUrl: './arquivar.component.html',
  styleUrls: ['./arquivar.component.css']
})
export class ArquivarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public chamado: Chamado,
    private userService: UserService,
    private chamadoService: ChamadosService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.initilizeFields()
  }

  
  private initilizeFields(): void {
    const idChamado: string | null = this.route.snapshot.paramMap.get('id');
    if (idChamado) {
      this.chamadoService.findById(idChamado).subscribe(chamado => {
        this.chamado = chamado;
      });
    }
  }

  public arquivar(chamado: Chamado):void{
    this.chamado.arquivar = true
    this.chamadoService.updateChamado(this.chamado)
   }
}
