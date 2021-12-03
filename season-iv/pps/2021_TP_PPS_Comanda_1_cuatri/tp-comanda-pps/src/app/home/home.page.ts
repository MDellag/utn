import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IUser, TypeUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { PushNotificationService } from '../services/push-notification.service';
// import { QrService } from '../services/qr.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private avatar: string;
  private name: string = '';
  private listaEspera = '';
  private mesa = '';
  private estadoDeLaMesa: string = '';
  private iUser: IUser;
  private readed: boolean = false;

  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    public router: Router,
    private toast: ToastService,
    private push: PushNotificationService
  ) {
    const userdata = <IUser>JSON.parse(this.cookieService.get('userData'));
    this.iUser = userdata;
    console.log(this.iUser);
    this.avatar = userdata.path || AuthService.user.profilePhoto;
    this.name = userdata.name || 'Usuario';
  }

  async scanCode() {
    this.listaEspera = await this.auth.scanQR();

    if (this.listaEspera == 'lista de espera') {
      await this.auth.agregarListaDeEspera();
      this.toast.showToastSuccess(
        'Agregado a la lista de espera correctamente!'
      );
      this.push.postToken({
        title: 'Nuevo cliente en Lista de Espera!',
        message: `El cliente ${AuthService.user.name} esta en lista de espera!`,
        token: PushNotificationService.listaDevices.filter(
          (y) => y.typeUser === TypeUser.Metre
        ),
      });
    } else {
      this.toast.showToastDanger(this.listaEspera);
    }
  }

  async tomarMesa() {
    this.mesa = await this.auth.scanQR();
    const usData = await this.auth.getUserCookieData();
    if (this.listaEspera == 'lista de espera') {
      if (['MESA1', 'MESA2'].includes(this.mesa)) {
        if (!['MESA1', 'MESA2'].includes(usData.mesa)) {
          this.auth.consultarMesa(this.mesa).subscribe((doc: any) => {
            if (doc.estado == 'libre' && !this.readed) {
              this.readed = true;
              this.auth.asignarClienteMesa(this.mesa);
              this.auth.asignarEstadoMesa(
                this.mesa,
                'ocupada',
                AuthService.user.id
              );
              this.auth.changeMesaUser(this.mesa, AuthService.user.id);
              this.auth.eliminarListaDeEspera(usData.id);
              this.router.navigateByUrl('cliente');
            } else if (doc.estado == 'ocupada' && !this.readed) {
              this.readed = true;
              this.toast.showToastDanger('La mesa se encuentra ocupada!');
            }
          });
          this.readed = false;
        } else {
          this.toast.showToastDanger('El Usuario ya tiene mesa asignada');
        }
      } else {
        this.toast.showToastDanger('Qr de la mesa erroneo.');
      }
    } else {
      this.toast.showToastDanger('Aun no se encuentra en lista de espera.');
    }
  }

  quit() {
    this.cookieService.deleteAll();
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  irMesa() {
    this.router.navigate(['mesa']);
  }

  handleResult(e) {
    console.log(e);
  }
}
