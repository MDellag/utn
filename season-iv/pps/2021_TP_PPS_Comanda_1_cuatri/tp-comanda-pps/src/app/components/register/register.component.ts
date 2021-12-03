import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IDniData, IUser, IUserDataRegister } from 'src/app/interfaces/user';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private correo: string = '';
  private password: string = '';
  public nombre: string = '';
  public apellido: string = '';
  public dni: number;
  private isFetchingData: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private photoService: PhotosService,
    private audio: AudioService
  ) {}

  async registerUser() {
    try {
      if (this.correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) == null)
        throw new Error('Formato de correo inválido.');

      if (!this.password || !this.nombre || !this.apellido)
        throw new Error('Debe completar todos los campos');

      if (this.dni.toString().length !== 8)
        throw new Error('El dni debe ser de 8 caracteres');

      if (!AuthService.user.path) throw new Error('Debe tomarse una Foto!');
    } catch (error) {
      this.audio.play('error');
      this.presentToast(error);
      return;
    }
    try {
      this.isFetchingData = true;
      const userData: IUserDataRegister = {
        name: this.nombre,
        lastname: this.apellido,
        dni: this.dni,
        email: this.correo,
        password: this.password,
      };
      const res = await this.auth.registerUser(userData);
      this.isFetchingData = false;
      this.audio.play('long');
      this.router.navigate(['login']);
    } catch (error) {
      console.log(error);
      this.audio.play('error');
      this.isFetchingData = false;
      this.presentToast(error.code);
    }
    this.clearInput();
  }

  clearInput() {
    this.correo = '';
    this.password = '';
    this.nombre = '';
    this.apellido = '';
    this.dni = null;
  }

  async scanCode() {
    const scannedCode = await this.auth.scanDni();

    const userQR = scannedCode.split('@');

    this.apellido = userQR[1].toLocaleLowerCase();
    this.nombre = userQR[2].toLocaleLowerCase();
    this.dni = parseInt(userQR[4]);
  }

  async tomarFoto() {
    const foto = await this.photoService.takePhoto();
    console.log(foto);
    AuthService.user.path = foto.dataUrl;
    console.log(AuthService.user.path);
  }

  async presentToast(message) {
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
  ngOnInit() {}
}
