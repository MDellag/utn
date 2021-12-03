import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  error(message: string, duration?: number) {
    this.snackBar.open(message, 'close', {
      duration: duration || 3000,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }

  success(message: string, duration?: number) {
    this.snackBar.open(message, 'close', {
      duration: duration || 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }

  warn(message: string, duration?: number) {
    this.snackBar.open(message, 'close', {
      duration: duration || 3000,
      panelClass: ['warn-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }
}
