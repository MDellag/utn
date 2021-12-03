import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private snackBar: MatSnackBar) {}

  notificationError(message: string, duration?: number) {
    this.snackBar.open(message, 'close', {
      duration: duration || 2000,
      panelClass: ['red-snackbar'],
    });
  }

  notificationSuccess(message: string, duration?: number) {
    this.snackBar.open(message, 'close', {
      duration: duration || 2000,
      panelClass: ['success-snackbar'],
    });
  }
}
