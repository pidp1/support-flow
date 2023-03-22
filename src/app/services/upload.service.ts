import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private notification: NotificationService
  ) { }

  public uploadFoto(photo: File): Observable<any>{
    const promise = this.storage.upload(`fotos/${Date.now()}`, photo)
    return from(promise).pipe(
      catchError(error =>{
        this.notification.showMessage("Erro ao enviar arquivo.")
        return EMPTY;
      })
    )
  }

  public uploadArquivo(arquivo: File): Observable<any>{
    const promise = this.storage.upload(`arquivos/${new Date().getTime()}_${arquivo.name}`, arquivo)
    return from(promise).pipe(
      catchError(error =>{
        this.notification.showMessage("Erro ao enviar arquivo.")
        return EMPTY;
      })
    )
  }

}
