import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {
  mesa: any = {};
  cliente: any = {};
  header: string;
  deshabilitado: boolean = true;
  pedido: any = {};
  hayPedido: boolean = false;
  subtotal: number = 0;
  descuento: number = 0;
  propina: number = 0;
  total: number = 0;
  entregado: boolean = false;
  quierePagar: boolean = false;
  puedePagar: boolean = true;
  spinner: boolean = false;
  propinaQR;
  Cliente;

  estadosPedidos = {
    PedidoRealizado: 'Pedido Realizado',
    PedidoConfirmadoDerivado: 'Pedido en preparacion',
    PedidoAEntregar: 'Pedido en camino',
    Entregado: 'Entregado',
    PagoProcesado: 'Pago Pendiente de Confirmacion',
    PagoAceptado: 'Pago Aceptado',
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    private push: PushNotificationService,
    private audio: AudioService
  ) /*private audio: AudioService,*/ {}

  async ngOnInit() {
    //this.audio.reproducirAudioCambioPant();
    this.spinner = true;
    this.deshabilitado = false;

    this.auth.traerPedidoCliente().subscribe((doc) => {
      if (doc.length != 0) {
        this.pedido = doc[0];
        console.log(
          'MesaComponent.ts ==> ngOnInit() - subscribe to traerPedidoCliente() = this.pedido: ',
          this.pedido
        );
        this.hayPedido = true;
        this.subtotal = 0;
        this.descuento = 0;
        this.total = 0;
        this.pedido.productos.forEach((producto) => {
          this.subtotal += producto.cantidad * producto.precio;
        }); // aca trae el pedido del cliente
        //this.descuento = this.subtotal * this.pedido.descuento / 100;
        this.propina = (this.subtotal * this.pedido.propina) / 100;
        this.total = this.subtotal - this.descuento + this.propina;

        if (this.pedido.estado == 'Entrega a confirmar') {
          this.entregado = true;
        } else if (this.pedido.estado == 'Entregado') {
          this.quierePagar = true;
        } else {
          this.entregado = false;
        }
        this.audio.play('pristine');
        this.spinner = false;
      } else {
        this.hayPedido = false;
        this.pedido = {};
        this.subtotal = 0;
        this.descuento = 0;
        this.total = 0;
      }
    });

    this.auth.traerCliente().subscribe((doc) => {
      this.Cliente = doc[0];
      this.header = this.Cliente.mesa;
    });
  }

  redireccionar(opcion: number) {
    switch (opcion) {
      case 0:
        this.router.navigate(['/consulta']);
        break;
      case 1:
        this.router.navigate(['/cliente']);
        break;
      case 2:
        //this.router.navigate(["/juegos"], {state: { mesa: this.mesa.mesa, cliente: this.mesa.idcliente }});
        break;
      case 3:
        this.router.navigate(
          [
            '/encuesta',
          ] /*, {state: { mesa: this.mesa.mesa, cliente: this.mesa.idcliente }}*/
        );
        break;
    }
  }

  cerrarSesion() {
    this.router.navigate(['/home']);
  }

  cambiarEstado() {
    this.auth.cambiarEstadoPedido('Entregado');
    this.entregado = false;
  }

  pagar() {
    this.auth.cambiarEstadoPedido('PagoProcesado');
    this.quierePagar = false;
    this.puedePagar = true;
  }

  async escanearPropina() {
    this.propinaQR = await this.auth.scanQR();

    switch (this.propinaQR) {
      case 'cero':
        this.auth.cambiarPropinaPedido(0);
        this.puedePagar = false;
        break;
      case 'cinco':
        this.auth.cambiarPropinaPedido(5);
        this.puedePagar = false;

        break;
      case 'diez':
        this.auth.cambiarPropinaPedido(10);
        this.puedePagar = false;

        break;
      case 'quince':
        this.auth.cambiarPropinaPedido(15);
        this.puedePagar = false;

        break;
      case 'veinte':
        this.auth.cambiarPropinaPedido(20);
        this.puedePagar = false;

        break;

      default:
        break;
    }
  }
}
