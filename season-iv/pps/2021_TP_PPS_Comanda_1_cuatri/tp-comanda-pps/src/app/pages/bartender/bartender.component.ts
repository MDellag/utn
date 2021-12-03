import { Component, OnInit } from '@angular/core';
import { TypeUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.scss'],
})
export class BartenderComponent implements OnInit {
  pedidos = [];
  isLoading = false;
  constructor(
    private auth: AuthService,
    private push: PushNotificationService
  ) {}

  async entregarPedido(item) {
    this.isLoading = true;
    await this.auth.modificarEstadoPedido(
      item.id,
      item.idprod,
      'PedidoAEntregar'
    );
    this.isLoading = false;
    this.pedidos = this.pedidos.filter(
      (e) => e.id !== item.id && e.idprod === item.idprod
    );

    this.push.postToken({
      title: `Nuevo Pedido Solicitado!`,
      message: `Se ha solicitado un/a ${item.nombre} en la mesa: `,
      token: PushNotificationService.listaDevices.filter(
        (y) => y.typeUser === TypeUser.Mozo
      ),
    });
  }

  async ngOnInit() {
    (await this.auth.getAllPedidos()).subscribe((e: any) => {
      let dat: any = {};

      console.log('CocineroComponent.ts ==> ngOnInit() | pedidos: ', e);
      e.forEach((f) => {
        f.productos.forEach((a) => {
          dat.id = f.idCliente;
          dat.mesa = f.mesa;
          dat.nombre = a.nombre;
          dat.cantidad = a.cantidad;
          dat.idprod = a.id;
          if (
            a.estado === 'PedidoConfirmadoDerivado' &&
            a.tipo === 'bebida' &&
            !this.pedidos.find((e) => e.id === dat.id && a.id === e.idprod)
          ) {
            this.pedidos.push(dat);
            this.push.postToken({
              title: `Nuevo Pedido Solicitado!`,
              message: `Se ha solicitado un/a ${dat.nombre} en la mesa: ${dat.mesa}`,
              token: PushNotificationService.listaDevices.filter(
                (y) => y.typeUser === TypeUser.Bartender
              ),
            });
          }
          dat = {};
        });
      });
    });
  }
}
