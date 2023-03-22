import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Credencials } from 'src/app/models/interfaces/credencials';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    formbuilder : FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
    ) {
    this.loginForm = formbuilder.group({ email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],})
  }

  ngOnInit() {
     
  }

  onLogin() {
    const credencials: Credencials = this.loginForm.value;
    this.authService.signIn(credencials).subscribe(() => {
      sessionStorage.setItem("email", credencials.email)
      this.notification.showMessage("Bem vindo(a)")
      this.router.navigate(["/home"])
    })
  }
}
