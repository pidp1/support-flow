import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  public showMessage(msg: string): void {
    this.snackBar.open(msg, ' Fechar', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
