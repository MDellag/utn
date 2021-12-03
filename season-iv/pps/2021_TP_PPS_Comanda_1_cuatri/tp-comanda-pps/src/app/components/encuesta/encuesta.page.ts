import { Component, OnInit } from '@angular/core';
//import { Chart } from 'chart.js';

//import { Camera, CameraOptions, DestinationType, EncodingType, PictureSourceType } from '@ionic-native/camera/ngx';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AudioService } from '../../services/audio.service';
import { ToastService } from 'src/app/services/toast.service';
//import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  isFetchingData = false;

  rangoEdad = '';
  llamativo = '';
  protocolo = '';
  recomendadosAmigos = false;
  recomendadosFamilia = false;
  recomendadosTrabajo = false;
  comentario = '';

  idCliente = null;
  mesa = null;
  arrFotos = new Array();

  enviado;
  error = '';

  constructor(
    /*private camera: Camera,*/ private router: Router,
    private auth: AuthService,
    private audio: AudioService,
    private toast: ToastService
  ) /*private vibration: Vibration,*/ {
    //this.mesa = this.router.getCurrentNavigation().extras.state.mesa;
    //this.idCliente = this.router.getCurrentNavigation().extras.state.cliente;
    this.mesa = AuthService.user.mesa;
    this.idCliente = AuthService.user.id;
  }

  ngOnInit() {
    //this.audio.reproducirAudioCambioPant();

    this.auth.traerPedidoCliente().subscribe((pedido: any) => {
      this.enviado = pedido[0].encuesta;
    });
  }

  cambiarEdad(e) {
    switch (e.detail.value) {
      case '13a20':
        this.rangoEdad = '13 a 20';
        break;
      case '20a30':
        this.rangoEdad = '20 a 30';
        break;
      case '30a40':
        this.rangoEdad = '30 a 40';
        break;
      case '40mas':
        this.rangoEdad = '40+';
        break;
      default:
        break;
    }
  }

  cambiarLlamativo(e) {
    this.llamativo = e.detail.value;
  }

  cambiarValorProtocolo(e) {
    this.protocolo = e.detail.value;
  }

  cambiarValorRecomendadosAmigos(e) {
    if (!this.recomendadosAmigos) {
      this.recomendadosAmigos = true;
    } else {
      this.recomendadosAmigos = false;
    }
  }

  cambiarValorRecomendadosFamilia(e) {
    if (!this.recomendadosFamilia) {
      this.recomendadosFamilia = true;
    } else {
      this.recomendadosFamilia = false;
    }
  }

  cambiarValorRecomendadosTrabajo(e) {
    if (!this.recomendadosTrabajo) {
      this.recomendadosTrabajo = true;
    } else {
      this.recomendadosTrabajo = false;
    }
  }

  validarRespuestas() {
    if (this.rangoEdad == '') {
      this.error = '¡Seleccione su edad!';
    } else if (this.llamativo == '') {
      this.error = '¡Seleccione qué le gustó más!';
    }
  }

  async enviarRespuestas() {
    this.error = '';
    this.validarRespuestas();

    if (this.error == '') {
      let arrRecomendados = new Array();
      if (this.recomendadosTrabajo) {
        arrRecomendados.push('trabajo');
      }

      if (this.recomendadosAmigos) {
        arrRecomendados.push('amigos');
      }

      if (this.recomendadosFamilia) {
        arrRecomendados.push('familia');
      }
      //await this.traerFotos();

      this.isFetchingData = true;

      this.auth.guardarEncuestaCliente(
        this.mesa,
        this.idCliente,
        this.rangoEdad,
        this.llamativo,
        this.protocolo,
        arrRecomendados,
        this.comentario,
        this.arrFotos
      );
      this.auth.actualizarEstadoEncuesta(this.idCliente);
      this.isFetchingData = false;
      this.enviado = true;
      this.toast.showToastSuccess('Gracias por participar de la encuesta');
    } else {
      this.toast.showToastDanger(this.error);
    }
  }

  verResultados() {
    this.router.navigate(['/estadisticas']);
  }

  volverAtras() {
    this.router.navigate(['/mesa'], { state: { encuesta: true } });
  }
}
