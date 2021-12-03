import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor(private notif: NotificationsService) {}

  validateFields(username: string, password: string, email?: string): boolean {
    if (email) {
      this.validateEmail(email);
    }
    if (username.length === 0) {
      this.notif.notificationError('Debe ingresar un username');
      return true;
    } else if (password.length === 0) {
      this.notif.notificationError('Debe ingresar un password');
      return true;
    }

    return false;
  }

  validateEmail(email: string) {
    const reg = /^[^\s@]+@[^\s@]+$/;
    if (email.length === 0 || !reg.test(email)) {
      this.notif.notificationError('Debes ingresar un email valido.');
      return true;
    }
  }
}
