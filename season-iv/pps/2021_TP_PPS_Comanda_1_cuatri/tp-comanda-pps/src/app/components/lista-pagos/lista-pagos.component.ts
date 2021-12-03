import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.scss'],
})
export class ListaPagosComponent implements OnInit {
  listaPagos = [];
  isFetchingData = false;
  constructor(private auth: AuthService, private router: Router) {}

  volver() {
    this.router.navigate(['mozo']);
  }

  async confirmarPago(item: any) {
    this.isFetchingData = true;
    // await this.auth.modificarEstadoPedido(item.id, '-1', '', 'PagoAceptado');
    await this.auth.changeMesaUser2(item.id);
    await this.auth.eliminarPedido(item.id);
    await this.auth.liberarMesaPorId(item.mesa);
    this.isFetchingData = false;
    this.listaPagos = this.listaPagos.filter((a) => a.id !== item.id);
  }

  async rechazarPago(id: any) {
    this.auth.cambiarEstadoPedido('PagoRechazado', id);
    this.auth.changeMesaUser('', id);
    this.auth.eliminarPedido(id);
    this.listaPagos = this.listaPagos.filter((a) => a !== id);
  }

  liberarMesaDespDePagar() {}

  async ngOnInit() {
    (await this.auth.getAllPedidos()).subscribe((e: any) => {
      e.forEach((f) => {
        if (
          f.estado === 'PagoProcesado' &&
          !this.listaPagos.find((k) => k.id === f.idCliente)
        ) {
          let dat: any = {};
          dat.mesa = f.mesa;
          dat.id = f.idCliente;
          this.listaPagos.push(dat);
          dat = {};
        }
      });
      console.log(
        'ListaPagos.ts ==> Atributo this.listaPagos: ',
        this.listaPagos
      );
    });
  }
}
