import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  public visivelDev: boolean = false
  public visivelManager: boolean = false
  
  public usuarioLogado: Usuario = {
    displayName: "",
    accessLevel: "",
    email: "",
    password: "",
    photoURL: "",
    cpf: "",
    telefone: 0
}

toggleControl = this.appComponent.toggleControl

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
    private userService: UserService,
    private appComponent: AppComponent
    
  ) {}

  ngOnInit(): void {
    this.getUser()
    
  }

  public getUser() {    
    this.userService.usuarioAtual().subscribe((user: any) => {
      this.userService.findById(user.uid).subscribe(usuario => {
        this.usuarioLogado = usuario
        this.setVisibility()
      })
    })
  }

  public setVisibility():void{
    if(this.usuarioLogado.accessLevel == "MANAGER"){
      this.visivelManager = true
    }
    if(this.usuarioLogado.accessLevel == "DEV"){
      this.visivelDev = true
    }
  }

  public logout(): void {
    this.authService.logout().subscribe(response => {
      this.notification.showMessage("Até logo!");
      this.router.navigate(["/signin"])
      window.location.reload()
    });
  }
}
