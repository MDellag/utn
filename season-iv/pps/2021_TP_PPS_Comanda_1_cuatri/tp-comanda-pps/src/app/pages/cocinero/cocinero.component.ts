import { Component, OnInit } from '@angular/core';
import { TypeUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.scss'],
})
export class CocineroComponent implements OnInit {
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
      (e) => e.id !== item.id && e.idprod !== item.idprod
    );
    this.push.postToken({
      title: `Pedido Listo para entregar!`,
      message: `El Pedido de ${item.nombre} para la mesa: ${item.mesa} esta listo para se entregado`,
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
            a.tipo === 'comida' &&
            !this.pedidos.find((e) => e.id === dat.id && a.id === e.idprod)
          ) {
            this.pedidos.push(dat);
          }
          dat = {};
        });
      });
    });
  }
}
