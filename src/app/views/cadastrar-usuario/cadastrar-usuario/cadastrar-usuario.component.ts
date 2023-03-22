import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Usuario } from 'src/app/models/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarComponent {
  hide = true;
  public formUser: FormGroup;
  public fotoUrl: string = '';
  public isLoadUpload: boolean = false;
  
  constructor(private authService: AuthService, fb: FormBuilder, private uploadService: UploadService, private router: Router, private notification: NotificationService) {
    this.formUser = fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      displayName: ['',[Validators.required,Validators.maxLength(50)]],
      accessLevel: ['',[Validators.required]],
      telefone: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(11)]],
      cpf: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  public uploadPhoto(event: any): void{
    this.isLoadUpload = true
    const file: File = event.target.files[0]
    this.uploadService.uploadFoto(file).subscribe(uploadResult =>{
      this.isLoadUpload = false;
      const storageRef = uploadResult.ref
      const promiseFileUrl = storageRef.getDownloadURL()
      promiseFileUrl.then((fotoUrl: string)=>{
        console.log(fotoUrl)
        this.fotoUrl = fotoUrl
      })
    })
  }

  public submit(): void {
    const user: Usuario = this.formUser.value;
    user.photoURL = this.fotoUrl
    this.authService.cadastrarUser(user).subscribe(() => {
      this.router.navigate(["/usuarios"])
      this.notification.showMessage("Usuário cadastrado com sucesso!")
    });
  }
}
