import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  private avatar: string;
  private name: string = '';

  //atributos
  spinner: boolean = false;
  mesa = null;
  idCliente = null;

  listaProd = new Array();
  listaComidas = new Array();
  listaBebidas = new Array();
  listaPostres = new Array();
  tab = 'Comidas';
  subtotal = 0;
  carrito = new Array();
  terminado = false;

  @ViewChild(IonContent, { read: IonContent, static: false })
  myContent: IonContent;

  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    public router: Router
  ) {
    const userdata = <IUser>JSON.parse(this.cookieService.get('userData'));
    console.log('ClientePage ==> Constructor - userData? :', userdata);
    this.avatar = userdata.path || AuthService.user.profilePhoto;
    this.name = userdata.name || 'Usuario';
  }

  ngOnInit() {
    this.auth.traerProductos().subscribe((lista: any) => {
      // lista.forEach((prod: any) => {
      //   if (!this.listaProd.find((k) => k.nombre === prod.nombre)) {
      //     this.listaProd.push(prod);
      //   }
      // });

      for (let m = 0; m < lista.length; m++) {
        if (!this.listaProd.find((k) => k.nombre === lista[m].nombre)) {
          this.listaProd.push(lista[m]);
        }
      }

      this.discriminarListas();
      this.setearCantidades();
    });
  }

  back() {
    this.router.navigate(['home']);
  }

  discriminarListas() {
    this.listaProd.forEach((prod) => {
      switch (prod.tipo) {
        case 'bebida':
          this.listaBebidas.push(prod);
          break;
        case 'comida':
          this.listaComidas.push(prod);
          break;
        case 'postre':
          this.listaPostres.push(prod);
          break;
        default:
          break;
      }
    });
  }

  setearCantidades() {
    this.listaPostres.forEach((p) => {
      p.cantidad = 1;
    });

    this.listaComidas.forEach((p) => {
      p.cantidad = 1;
    });

    this.listaBebidas.forEach((p) => {
      p.cantidad = 1;
    });
  }

  cambiarTab(tabName: string) {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
    }, 3000);

    this.tab = tabName;
    this.listaBebidas.forEach((p) => {
      p.cantidad = 1;
    });

    this.listaComidas.forEach((p) => {
      p.cantidad = 1;
    });

    this.listaPostres.forEach((p) => {
      p.cantidad = 1;
    });
  }

  agregarAlCarrito(producto) {
    let prod = {
      id: producto.id,
      descripcion: producto.descripcion,
      nombre: producto.nombre,
      fotos: producto.fotos,
      tipo: producto.tipo,
      precio: producto.precio,
      cantidad: producto.cantidad,
      tiempo: producto.tiempo,
      estado: 'PedidoRealizado',
    };

    let encontrado = false;

    this.carrito.forEach((p) => {
      if (p.nombre == prod.nombre) {
        p.cantidad += prod.cantidad;
        encontrado = true;
      }
    });

    if (encontrado == false) {
      this.carrito.push(prod);
    }

    producto.cantidad = -1;
    setTimeout(() => {
      producto.cantidad = 1;
    }, 3000);

    this.calcularPrecioCarrito();
  }

  sumarCantidad(producto) {
    producto.cantidad++;
  }

  restarCantidad(producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  calcularPrecioCarrito() {
    this.subtotal = 0;
    this.carrito.forEach((p) => {
      this.subtotal += p.precio * p.cantidad;
    });
  }

  sumarCantidadCarrito(producto) {
    producto.cantidad++;
    this.calcularPrecioCarrito();
  }

  restarCantidadCarrito(producto) {
    if (producto.cantidad > 0) {
      if (producto.cantidad == 1) {
        this.carrito.forEach((p, i) => {
          if (producto.nombre == p.nombre) {
            this.carrito.splice(i, 1);
          }
        });
      } else {
        producto.cantidad--;
      }
      this.calcularPrecioCarrito();
    }
  }

  cambiarProductoCarrito(producto) {
    this.carrito.forEach((p) => {
      if (p.nombre == producto.nombre) {
        p.cantidad = producto.cantidad;
      }
    });
  }

  enviarPedido() {
    this.auth.cargarPedido(this.carrito);
    this.terminado = true;
  }

  volverAMesa() {
    this.router.navigate(['/mesa']);
  }
}
