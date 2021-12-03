import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastController) {}

  async showToastDanger(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      animated: true,
      mode: 'md',
      color: 'danger',
    });
    toast.present();
  }

  async showToastSuccess(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      animated: true,
      mode: 'md',
      color: 'success',
    });
    toast.present();
  }
}
