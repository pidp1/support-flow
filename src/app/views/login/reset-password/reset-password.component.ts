import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup
  public emailDigitado: string = ''
  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      })
    }

  ngOnInit(): void {
  }

  public resetPassword(email:string):void{
    this.authService.resetPassword(email)
    this.notification.showMessage("Email enviado!");
    this.router.navigate(['/signin'])
  }

}
