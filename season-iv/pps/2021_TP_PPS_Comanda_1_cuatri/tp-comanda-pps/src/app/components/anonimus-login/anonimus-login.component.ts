import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';
import { PhotosService } from 'src/app/services/photos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-anonimus-login',
  templateUrl: './anonimus-login.component.html',
  styleUrls: ['./anonimus-login.component.scss'],
  providers: [PhotosService],
})
export class AnonimusLoginComponent implements OnInit {
  private nombre: string = '';
  private profilePhoto: string;
  public spinner: boolean = false;
  private static avatarEmpty: string = 'assets/images/avatarEmpty.png';

  constructor(
    private router: Router,
    private photoService: PhotosService,
    private toast: ToastService,
    private auth: AuthService,
    private audio: AudioService
  ) {
    this.profilePhoto = AnonimusLoginComponent.avatarEmpty;
  }

  volverLogin() {
    this.router.navigate(['login']);
  }

  async loginAnonimo() {
    if (!this.nombre) {
      this.toast.showToastDanger('Por favor ingrese su nombre!');
      this.audio.play('error');
      return;
    }

    if (
      !this.profilePhoto ||
      this.profilePhoto === AnonimusLoginComponent.avatarEmpty
    ) {
      this.toast.showToastDanger('Por favor ingrese su foto');
      this.audio.play('error');
      return;
    }
    this.spinner = true;
    await this.photoService.savePhoto(this.profilePhoto);
    await this.auth.saveAnonimo(this.nombre);
    this.spinner = false;
    this.router.navigate(['home']);
  }

  async uploadPhoto() {
    const dat = await this.photoService.takePhoto();
    this.profilePhoto = dat.dataUrl || AnonimusLoginComponent.avatarEmpty;
  }
  ngOnInit() {}
}
