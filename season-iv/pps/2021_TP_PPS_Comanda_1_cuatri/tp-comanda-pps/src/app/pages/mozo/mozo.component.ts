import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.component.html',
  styleUrls: ['./mozo.component.scss'],
})
export class MozoComponent implements OnInit {
  pedidos = [];
  pedidosAEntregar = [];
  pagos = [];
  tab = 'MOZO';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private ts: ToastService,
    private router: Router,
    private push: PushNotificationService
  ) {}

  async confirmPedido(item) {
    this.isLoading = true;
    console.log(this.pedidos);
    await this.auth.modificarEstadoPedido(
      item.id,
      item.idprod,
      'PedidoConfirmadoDerivado'
    );
    this.isLoading = false;
    if (item.tipo === 'comida') {
      this.push.postToken({
        title: `Nuevo Pedido!`,
        message: `Se ha realizado un pedido de ${item.cantidad} ${item.nombre}`,
        token: PushNotificationService.listaDevices.filter(
          (y) => y.typeUser === TypeUser.Cocinero
        ),
      });
    } else {
      this.push.postToken({
        title: `Nuevo Pedido!`,
        message: `Se ha realizado un pedido de ${item.cantidad} ${item.nombre}`,
        token: PushNotificationService.listaDevices.filter(
          (y) => y.typeUser === TypeUser.Bartender
        ),
      });
    }
    this.pedidos = this.pedidos.filter(
      (e) => e.idprod !== item.idprod && e.id !== item.id
    );
  }

  async cancelPedido(item) {
    this.isLoading = true;
    await this.auth.modificarEstadoPedido(item.id, item.idprod, 'cancelado');
    this.isLoading = false;
    this.pedidos = this.pedidos.filter(
      (e) => e.idprod !== item.idprod && e.id !== item.id
    );
  }

  async entregarPedido(item) {
    await this.auth.modificarEstadoPedido(
      item.id,
      item.idprod,
      'Entregado',
      'Entregado'
    );

    this.pedidosAEntregar = this.pedidosAEntregar.filter(
      (e) => e.idprod !== item.idprod && e.id !== item.id
    );
  }

  liberarMesa(nro: string) {
    this.auth.asignarEstadoMesa(nro, 'libre', '');
    this.ts.showToastSuccess('Mesa liberada!');
  }

  listaPagos() {
    this.pagos = [];
    this.router.navigate(['lista-pagos']);
  }

  irConsultas() {
    this.router.navigate(['consulta']);
  }

  cambiarTab(tabName: string) {
    this.tab = tabName;
  }

  async ngOnInit() {
    (await this.auth.getAllPedidos()).subscribe((e: any) => {
      let dat: any = {};

      e.forEach((f) => {
        if (f.estado === 'PagoProcesado') {
          if (!this.pagos.find((m) => m === f.idCliente)) {
            this.pagos.push(f.idCliente);
          }
        } else {
          f.productos.forEach((a) => {
            dat.id = f.idCliente;
            dat.mesa = f.mesa;
            dat.nombre = a.nombre;
            dat.cantidad = a.cantidad;
            dat.idprod = a.id;
            dat.tipo = a.tipo;
            if (
              a.estado === 'PedidoRealizado' &&
              !this.pedidos.find((e) => e.id === dat.id && e.idprod === a.id)
            ) {
              this.pedidos.push(dat);
            } else if (
              a.estado === 'PedidoAEntregar' &&
              !this.pedidosAEntregar.find(
                (p) => p.id === dat.id && p.idprod == a.id
              )
            ) {
              this.pedidosAEntregar.push(dat);
            }

            dat = {};
          });
          console.log('Mozo.ts => ngOnInit() - F: ', f);
          console.log('Mozo.ts => ngOnInit() - this.pedidos: ', this.pedidos);
          if (f.estado === 'cancelado') {
            this.pedidos = this.pedidos.filter((e) => e.id !== dat.id);
          }
        }
      });
    });
  }
}
