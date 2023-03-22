

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY, lastValueFrom } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Chamado } from '../models/interfaces/chamado';
import { Usuario } from '../models/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  
  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
    private auth: AngularFireAuth,
  ) { }

  public createChamado(user: Usuario): Observable<any> {
    const promise = this.firestore.collection("users").add(user).then(ref =>{
      const usuario:Usuario = user
      usuario.id = ref.id
      this.firestore.collection("users").doc(ref.id).update(user)
    });
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
  
  public findAll(): Observable<any> {
    const promise = this.firestore.collection("users").get();
    return from(promise).pipe(      
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const usuario: Usuario = doc.data() as Usuario;
          usuario.id = doc.id;
          return usuario;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("users").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const usuario: Usuario = doc.data() as Usuario;
        usuario.id = doc.id;
        return usuario;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findByAccess(tipo: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('accessLevel', '==', tipo)).valueChanges().pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }


  

  public deleteChamado(id: string) {
    const promise = this.firestore.collection("users").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateChamado(chamado: Chamado) {
    const promise = this.firestore.collection("chamados").doc(chamado.idChamado).update(chamado);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  
  public usuarioAtual(): any {
    const promise = this.auth.authState.pipe(first())
    return promise
    //tentar implementar dessa forma abaixo
    // async getAsyncData() {
    //   this.asyncResult = await this.httpClient.get<Employee>(this.url).toPromise();
    //   console.log('No issues, I will wait until promise is resolved..');

  }

}
