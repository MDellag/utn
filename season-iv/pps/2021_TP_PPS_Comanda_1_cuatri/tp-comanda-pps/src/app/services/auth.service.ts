import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  IDniData,
  IUser,
  IUserDataRegister,
  IUserListaEspera,
  TypeUser,
} from '../interfaces/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PhotosService } from './photos.service';
import { CookieService } from 'ngx-cookie-service';
import { PushNotificationService } from './push-notification.service';
import { HttpClient } from '@angular/common/http';
import { AudioService } from './audio.service';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static user: IUser = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    dni: '',
    profilePhoto: '',
    typeUser: TypeUser.Anonimo,
    aproved: false,
    path: '',
    date: 0,
    mesa: '',
  };

  public static dataUsrEspera: IUserListaEspera = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    dni: '',
    profilePhoto: '',
    path: '',
    estado: '',
    mesa: '',
  };

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private barcodeScanner: BarcodeScanner,
    private photoService: PhotosService,
    private cookieService: CookieService,
    private push: PushNotificationService,
    private audio: AudioService
  ) {}

  async registerUser(userData: IUserDataRegister) {
    const date = Date.now();
    const id = `${userData.name}.${date}`;

    AuthService.user.id = id;
    AuthService.user.name = userData.name;
    AuthService.user.lastname = userData.lastname;
    AuthService.user.email = userData.email;
    AuthService.user.password = userData.password;
    AuthService.user.dni = userData.dni.toString();
    AuthService.user.date = date;

    console.log(AuthService.user);
    if (AuthService.user.path) {
      await this.angularFireAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      await this.photoService.savePhoto(AuthService.user.path);
      await this.firestore.collection('clientes').doc(id).set(AuthService.user);
      this.push.postToken({
        title: 'Nuevo usuario registrado!',
        message: `El usuario ${AuthService.user.name} - ${AuthService.user.lastname} con dni: ${AuthService.user.dni} se ha registrado y esta pendiente de validacion`,
        token: PushNotificationService.listaDevices.filter(
          (y) => y.typeUser === TypeUser.Supervisor
        ),
      });
    } else throw new Error('Hubo un error al intentar Registrar al Usuario');
  }

  async saveAnonimo(name: string): Promise<void> {
    const date = Date.now();
    const id = `${name}.${date}`;

    AuthService.user.id = id;
    AuthService.user.date = date;
    AuthService.user.name = name;
    AuthService.user.typeUser = TypeUser.Anonimo;

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);
    const data = AuthService.user;
    await this.firestore.collection('clientes').doc(id).set(AuthService.user);

    this.cookieService.set('userData', JSON.stringify(data), expireDate);
  }

  /**
   * Trae el observable de los datos de usuario en firestore.
   */
  async traerInfoFirestore(Id) {
    return new Promise((resolve, rejected) => {
      this.firestore
        .collection('clientes', (ref) => ref.where('id', '==', Id))
        .get()
        .subscribe((data) => {
          //alert(data);
          resolve(data);
        });
    });
  }

  async registerAdmin(adminData: IUser) {
    await this.firestore.collection('users').add(adminData);
  }

  traerPorEmail(correo) {
    return this.firestore
      .collection('clientes', (ref) => ref.where('correo', '==', correo))
      .valueChanges();
  }

  async agregarListaDeEspera() {
    AuthService.dataUsrEspera.id = AuthService.user.id;
    AuthService.dataUsrEspera.name = AuthService.user.name;
    AuthService.dataUsrEspera.lastname = AuthService.user.lastname;
    AuthService.dataUsrEspera.email = AuthService.user.email;
    AuthService.dataUsrEspera.password = AuthService.user.password;
    AuthService.dataUsrEspera.dni = AuthService.user.dni;
    AuthService.dataUsrEspera.profilePhoto = AuthService.user.profilePhoto;
    AuthService.dataUsrEspera.path = AuthService.user.path;
    AuthService.dataUsrEspera.estado = 'En Lista';
    AuthService.dataUsrEspera.mesa = 'Sin Asignar';
    console.log(AuthService.dataUsrEspera);
    await this.firestore
      .collection('listaDeEspera')
      .doc(AuthService.dataUsrEspera.id)
      .set(AuthService.dataUsrEspera);
  }

  async logInUser(correo: string, password: string) {
    this.resetContext();
    const dataFirestore = await this.firestore
      .collection('clientes')
      .ref.where('email', '==', correo)
      .get();

    const dataFirestoreUser = await this.firestore
      .collection('users')
      .ref.where('email', '==', correo)
      .get();

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    dataFirestore.forEach((doc) => {
      const data = <IUser>doc.data();
      AuthService.user = data;
      this.cookieService.set('userData', JSON.stringify(data), expireDate);
    });

    dataFirestoreUser.forEach((doc) => {
      const data = <IUser>doc.data();
      AuthService.user = data;
      this.cookieService.set('userData', JSON.stringify(data), expireDate);
    });

    this.push.initPush();
    this.audio.play('insight');
    if (AuthService.user.aproved) {
      await this.angularFireAuth.signInWithEmailAndPassword(correo, password);
    } else {
      const Err = { code: 409 };
      throw Err;
    }
  }

  getListaEspera() {
    return this.firestore.collection('listaDeEspera').valueChanges();
  }

  async getUserCookieData(): Promise<any> {
    const cookie = JSON.parse(this.cookieService.get('userData'));
    return cookie;
  }

  async deleteCookies() {
    this.cookieService.deleteAll();
  }

  resetContext() {
    AuthService.user = {
      id: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      dni: '',
      profilePhoto: '',
      typeUser: TypeUser.Anonimo,
      aproved: false,
      path: '',
      date: 0,
      mesa: '',
    };
  }
  async scanDni(): Promise<IDniData | any> {
    const barcodeData = await this.barcodeScanner.scan({ formats: 'PDF_417' });

    return barcodeData.text;
  }

  async scanQR() {
    const qrData = await this.barcodeScanner.scan();

    return qrData.text;
  }

  async changeMesaUser(mesa: string, id: string) {
    await this.firestore.collection('clientes').doc(id).update({ mesa: mesa });
  }

  async changeMesaUser2(id: string) {
    await this.firestore.collection('clientes').doc(id).update({ mesa: '' });
  }

  async liberarMesaPorId(mesa: string) {
    this.firestore
      .collection('mesas')
      .doc(mesa)
      .set({
        cliente: '',
        estado: 'libre',
        qr: mesa,
        numero: mesa === 'MESA1' ? '1' : '2',
      });
  }

  /*
   * carga un pedido
   */
  async cargarPedido(productos) {
    return new Promise((resolve, rejected) => {
      this.firestore
        .collection('pedidos')
        .doc(AuthService.user.id)
        .set({
          confirmado: false,
          descuento: 0,
          estado: 'PedidoRealizado',
          idCliente: AuthService.user.id,
          mesa: AuthService.user.mesa,
          productos: productos,
          intentosDescuentoDiez: 3,
          intentosDescuentoQuince: 3,
          intentosDescuentoTreinta: 1,
          propina: 0,
        })
        .catch((error) => rejected(error));
    });
  }

  async eliminarListaDeEspera(Id: string) {
    const us: any = await this.firestore
      .collection('listaDeEspera')
      .ref.where('id', '==', Id)
      .get();
    const data = us.docs[0].data();
    console.log('DeleteListaEspera', data);
    data.estado = 'en mesa';
    await this.firestore.collection('listaDeEspera').doc(Id).set(data);
  }

  async modificarEstadoPedido(
    idcliente: string,
    idprod: string,
    estadoProducto: string,
    estado?: string
  ) {
    console.log(idcliente, estado, idprod);
    const prod: any = await this.firestore.collection('pedidos').ref.get();
    let data: any = {};

    for (let i = 0; i < prod.docs.length; i++) {
      const produc = prod.docs[i].data();
      console.log(produc, ' IDCLIENTE: ', idcliente);
      if (produc.idCliente === idcliente) {
        data = produc;
      }
    }
    console.log('DATA', data);
    for (let i = 0; i < data.productos.length; i++) {
      if (idprod === data.productos[i].id) {
        data.productos[i].estado = estadoProducto;
      }
    }

    if (estado) data.estado = estado;

    if (data.estado === 'Pedido en Proceso') data.confirmado = true;

    this.firestore.collection('pedidos').doc(data.idCliente).set(data);
  }

  //trae todos los productos
  traerProductos() {
    return this.firestore.collection('productos').valueChanges();
  }

  //retorna el estado de la mesa
  consultarMesa(id: string) {
    const a = this.firestore.collection('mesas').doc(id).valueChanges();
    return a;
  }

  //Asigna el estado a la mesa por id
  asignarEstadoMesa(id: string, Estado: string, idCliente: string) {
    this.firestore
      .collection('mesas')
      .doc(id)
      .set({
        cliente: idCliente,
        estado: Estado,
        numero: id === 'MESA1' ? '1' : '2',
        qr: id,
      });
  }

  //Asigna el cliente a la mesa por id
  asignarClienteMesa(id: string) {
    AuthService.user.mesa = id;
    this.firestore.collection('mesas').doc(id).update({
      cliente: AuthService.user.id,
    });
  }

  async asignarMesaClienteListaEspera(Mesa) {
    await this.firestore
      .collection('listaDeEspera')
      .doc(AuthService.user.id)
      .update({
        mesa: Mesa,
      });
  }

  /**
   * Trae el pedido de este cliente
   */
  traerPedidoCliente() {
    return this.firestore
      .collection('pedidos', (ref) =>
        ref.where('idCliente', '==', AuthService.dataUsrEspera.id)
      )
      .valueChanges();
  }

  traerCliente() {
    return this.firestore
      .collection('listaDeEspera', (ref) =>
        ref.where('id', '==', AuthService.dataUsrEspera.id)
      )
      .valueChanges();
  }

  //TRAER ENCUESTAS
  traerEncuestas() {
    return this.firestore.collection('encuestasClientes').valueChanges();
  }

  /**
   * Cambia el estado de un pedido
   */
  async cambiarEstadoPedido(Estado, id?) {
    await this.firestore.collection('pedidos').doc(AuthService.user.id).update({
      estado: Estado,
    });
  }

  /*
   *Cambia la propina de un pedido
   */
  cambiarPropinaPedido(Propina) {
    this.firestore
      .collection('pedidos')
      .doc(AuthService.dataUsrEspera.id)
      .update({
        propina: Propina,
      });
  }

  async eliminarPedido(id: string) {
    await this.firestore.collection('pedidos').doc(id).delete();
  }

  /**
   * Permite saber cuando hay un nuevo registro pendiente de aprobacion, retorna el documento encriptado recientemente agregado
   */
  hayNuevoRegistro() {
    return this.firestore
      .collection('clientes', (ref) => ref.where('aproved', '==', false))
      .stateChanges(['added']);
  }

  /**
   * Esta es igual a traerClientesSinAprobar pero con valueChanges porque no me funcionaba la otra
   */
  traerClientesPendientesAprobacion() {
    return this.firestore
      .collection('clientes', (ref) => ref.where('aproved', '==', false))
      .valueChanges();
  }

  /**
   * Actualiza la aprobacion de un cliente.
   * @param uid uid del cliente a actualizar.
   */
  actualizarAprobacionRegistro(uid) {
    return this.firestore
      .collection('clientes')
      .doc(uid)
      .update({ aproved: true });
  }

  /**
   * Elimina un cliente de la coleccion.
   * @param uid uid del cliente a eliminar.
   */
  eliminarCliente(uid) {
    return this.firestore.collection('clientes').doc(uid).delete();
  }

  async getAllPedidos() {
    return this.firestore.collection('pedidos').valueChanges();
  }

  async logOut() {
    this.angularFireAuth.signOut();
  }

  actualizarEstadoEncuesta(uid) {
    return this.firestore
      .collection('pedidos')
      .doc(uid)
      .update({ encuesta: true });
  }

  async guardarEncuestaCliente(
    mesa,
    idCliente,
    rangoEdad,
    llamativo,
    puntajeProtocolo,
    arrayRecomendados,
    sugerencia,
    arrayFotos
  ) {
    const fecha = Date.now();
    await this.firestore
      .collection('encuestasClientes')
      .doc(fecha.toString())
      .set({
        mesa: mesa,
        cliente: idCliente,
        fecha: fecha.toString(),
        rangoEdad: rangoEdad,
        llamativo: llamativo,
        puntajeProtocolo: puntajeProtocolo,
        recomendados: arrayRecomendados,
        sugerencia: sugerencia,
        fotos: arrayFotos,
      });
  }
}
