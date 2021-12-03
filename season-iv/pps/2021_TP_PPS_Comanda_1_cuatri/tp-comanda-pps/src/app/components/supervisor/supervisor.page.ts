import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PushNotificationService } from '../../services/push-notification.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { init } from 'emailjs-com';
init('user_IDXJ6EX5AwjLsU0gSlSK8');
//import { AudioService } from "../../services/audio.service";

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  lista = new Array();
  hayPendientes: boolean = false;
  spinner: boolean = false;
  primerPasada: boolean = false;
  isFetchingData = false;

  constructor(
    private auth: AuthService,
    router: Router,
    private pn: PushNotificationService
  ) /*private audio: AudioService*/ {}

  ngOnInit() {
    //this.audio.reproducirAudioCambioPant();
    this.auth.traerClientesPendientesAprobacion().subscribe((doc) => {
      this.lista = doc;
      /*setTimeout(() => {
        this.lista.forEach(cliente => {
          this.auth.buscarFotoPorNombre(cliente.foto)
          .then(link => cliente.link = link);
        });  
      }, 1000);*/
      if (this.lista.length != 0) {
        this.hayPendientes = true;
      } else {
        this.hayPendientes = false;
      }
    });
    this.auth.hayNuevoRegistro().subscribe(() => {
      if (this.primerPasada) {
        this.pn.pushNotification(
          '¡Nueva solicitud pendiente de aprobación!',
          'Un nuevo cliente se ha registrado.',
          1
        );
      } else {
        this.primerPasada = true;
      }
    });
  }

  aceptarRegistro(
    dni: number,
    fecha: number,
    correo: string,
    clave: string,
    nombre: string
  ) {
    this.isFetchingData = true;
    //alert(dni+"."+fecha);
    setTimeout(() => {
      this.auth
        .actualizarAprobacionRegistro(nombre + '.' + fecha)
        //.then(() => {
        //this.auth.registroAuth(correo, clave)
        .then((cliente) => {
          console.log(cliente);
          //alert("Envio email aceptando");
          this.enviarEmail('Su registro fue aceptado', correo, nombre);
        })
        .catch((error) => console.log(error));
      this.isFetchingData = false;
      //});
    }, 2000);
  }

  rechazarRegistro(dni: number, fecha: number, correo: string, nombre: string) {
    this.isFetchingData = true;
    setTimeout(() => {
      //this.auth.borrarFotoPorNombre(dni+"."+fecha+".jpg");
      this.auth.eliminarCliente(nombre + '.' + fecha).then(() => {
        //alert("Envio email rechazando");
        this.enviarEmail('Su registro fue rechazado', correo, nombre);
        this.isFetchingData = false;
      });
    }, 2000);
  }

  enviarEmail(mensaje: string, correo: string, nombre: string) {
    let templateParams = {
      correoDestinatario: correo,
      nombreDestinatario: nombre,
      mensaje: mensaje,
    };

    /*emailjs.send("gmail", "template_2f40kim", templateParams)
    .then(res => console.log("Correo enviado.",res.status,res.text))
    .catch(error => console.log("Error al enviar.",error));*/

    emailjs
      .send('yoqueriareact', 'template_2f40kim', templateParams)
      .then(function (res) {
        console.log(res.status);
      });
  }
}
