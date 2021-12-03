import { Component, OnInit } from '@angular/core';
import { TypeUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: 'app-metre',
  templateUrl: './metre.component.html',
  styleUrls: ['./metre.component.scss'],
})
export class MetreComponent implements OnInit {
  showingQr: boolean = false;
  pathQr: string = '';
  mesaStatus: string = '';
  mesaStatus2: string = '';
  styleMesa1: string = '';
  styleMesa2: string = '';
  listaPendientes = [];
  constructor(
    private auth: AuthService,
    private push: PushNotificationService
  ) {}

  showMesaQr() {
    this.pathQr = 'assets/images/qr-mesa/mesa1.svg';
    this.showingQr = true;
  }

  showMesaQr2() {
    this.pathQr = 'assets/images/qr-mesa/mesa2.svg';
    this.showingQr = true;
  }

  back() {
    this.pathQr = '';
    this.showingQr = false;
  }

  ngOnInit() {
    this.auth.consultarMesa('MESA1').subscribe((e: any) => {
      this.mesaStatus = e.estado.toUpperCase();

      if (e.estado === 'ocupada')
        this.styleMesa1 = 'background: linear-gradient(to bottom right, #f02718, #9b1e09);';
      else this.styleMesa1 = 'background: linear-gradient(to bottom right, #4cf191, #033f17);';
    });
    this.auth.consultarMesa('MESA2').subscribe((e: any) => {
      this.mesaStatus2 = e.estado.toUpperCase();

      if (e.estado === 'ocupada')
        this.styleMesa2 = 'background: linear-gradient(to bottom right, #f02718, #9b1e09);';
      else this.styleMesa2 = 'background: linear-gradient(to bottom right, #4cf191, #033f17);';
    });

    this.auth.getListaEspera().subscribe((e: any) => {
      let dat: any = {};
      e.forEach((a) => {
        if (a.estado === 'En Lista') {
          dat.name = a.name;
          dat.lastname = a.lastname;
          dat.id = a.id;

          if (!this.listaPendientes.find((k) => k.id === dat.id)) {
            this.listaPendientes.push(dat);
            this.push.postToken({
              title: 'Nuevo cliente en lista de espera!',
              message: `${dat.name} esta esperando para poder ir a su mesa!`,
              token: PushNotificationService.listaDevices.filter(
                (y) => y.typeUser === TypeUser.Metre
              ),
            });
          }
          dat = {};
        } else if (a.estado === 'en mesa') {
          this.listaPendientes = this.listaPendientes.filter(
            (g) => g.id !== a.id
          );
        }
      });
    });

    console.log(this.listaPendientes);
  }
}
