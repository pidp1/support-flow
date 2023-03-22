import { Credencials } from '../models/interfaces/credencials';
import { Usuario } from '../models/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private functions: AngularFireFunctions,
    private auth: AngularFireAuth,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private notification: NotificationService
  ) { }

  public cadastrarUser(user: Usuario): Observable<any> {
    const createUser = this.functions.httpsCallable('createUser');
    return createUser(user).pipe(
      catchError( error => {
        if (error.code == "auth/email-already-in-use"){
          this.notification.showMessage("Erro, Usuario já cadastrado!")
         }
         else if(error.code == "auth/weak-password"){
           this.notification.showMessage("A Senha deve conter no mínimo 6 caracteres.")
         }
         else{
        this.notification.showMessage("Erro ao cadastrar usuário.")
        console.error(error)
         }
        return EMPTY
      })
    );
  }

  public resetPassword(email: string){
    console.log(email, 'email do auth')
    const promise = this.auth.sendPasswordResetEmail(email);
    return from(promise).pipe(
      catchError(error=>{
        console.log(error)
        this.notification.showMessage("Email não encontrado")
        return EMPTY
        
      })
    )
  }

  public signIn(user: Credencials): Observable<any> {     
    const promise = this.auth.signInWithEmailAndPassword(user.email, user.password);
    return from(promise).pipe(
      catchError( error => {
        if (error.code == "auth/user-not-found"){
         this.notification.showMessage("Erro, Usuario não encontrado!")
        }
        else if(error.code == "auth/wrong-password"){
          this.notification.showMessage("Senha Incorreta.")
        }
        else{
        this.notification.showMessage("Erro ao autenticar.")
        console.error(error)
        }
        return EMPTY
      }),
      tap(async (userCredencials) => {
        if (userCredencials.user) {
          const info = await userCredencials.user.getIdTokenResult();
          const accessLevel = info.claims['accessLevel'];
          this.redirectUser(accessLevel);
        }
      })
    );
  }

  private redirectUser(accessLevel: string): void {
    switch (accessLevel) {
      case "USER":
        this.router.navigate(['/home']);
        return;
      case "DEV":
        this.router.navigate(['/devteam']);
        return;
      case "MANAGER":
        this.router.navigate(['/manager']);
        return;
      default:
        this.router.navigate(['/home']);
        return;
    }
  }
  logout() {
    sessionStorage.clear();
    const promise = this.firebaseAuth.signOut();
    this.router.navigate(["/signin"])
    window.location.reload()
    return from(promise);
  }



}
