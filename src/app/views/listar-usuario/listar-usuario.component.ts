import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

// const 


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  prioridade: any;

  dataSource:any = []
  displayedColumns = ['displayName', 'email', 'accessLevel', 'cpf', 'telefone', 'photoUrl'];

  constructor(
    private userService: UserService
  ) { }
  spinner: boolean = true

  ngOnInit(
  ): void {
    this.initializeFields()
  }
  
  public initializeFields (): void {
    this.userService.findAll().subscribe( users => {
      this.dataSource = new MatTableDataSource<Usuario>(users)
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
