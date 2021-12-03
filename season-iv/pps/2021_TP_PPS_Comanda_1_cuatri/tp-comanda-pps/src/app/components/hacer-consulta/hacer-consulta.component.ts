import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { TypeUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: 'app-hacer-consulta',
  templateUrl: './hacer-consulta.component.html',
  styleUrls: ['./hacer-consulta.component.scss'],
})
export class HacerConsultaComponent implements OnInit {
  Mensajes: any;
  mensaje = '';
  miId: string;
  miNombre: string;
  Usuario;
  mesa;

  constructor(
    private auth: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    private push: PushNotificationService
  ) {}

  async traerMensajes() {
    this.miId = AuthService.user.id;
    this.miNombre = AuthService.user.name;

    const doc = await this.afs.collection('consultas');

    await doc.valueChanges().subscribe((data) => {
      this.Mensajes = data;

      console.log(this.Mensajes);
      this.Mensajes.forEach((element) => {
        element.miMensaje = String(element.idUsuario) === String(this.miId);
      });
    });
  }

  Enviar() {
    if (AuthService.user.typeUser == 'Mozo') {
      if (this.mensaje != '') {
        this.afs.collection('consultas').doc(String(Date.now())).set({
          idUsuario: this.miId,
          mensaje: this.mensaje,
          creado: firebase.firestore.FieldValue.serverTimestamp(),
          nombreUsuario: this.miNombre,
          tipo: 'Mozo',
        });

        this.mensaje = '';
      }
    } else {
      if (this.mensaje != '') {
        this.afs.collection('consultas').doc(String(Date.now())).set({
          idUsuario: this.miId,
          mensaje: this.mensaje,
          creado: firebase.firestore.FieldValue.serverTimestamp(),
          nombreUsuario: this.miNombre,
          tipo: this.mesa,
        });

        this.push.postToken({
          title: `Nuevo Mensaje de: ${AuthService.user.name} Mesa:${AuthService.user.mesa} !`,
          message: this.mensaje,
          token: PushNotificationService.listaDevices.filter(
            (y) => y.typeUser === TypeUser.Mozo
          ),
        });
      }
      this.mensaje = '';
    }
  }

  volver() {
    const quienEs = AuthService.user.typeUser;

    if (quienEs == 'Mozo') {
      this.router
        .navigateByUrl('/mozo', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/mozo']);
        });
    } else {
      this.router
        .navigateByUrl('/mesa', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/mesa']);
        });
    }
  }

  async ngOnInit() {
    if (AuthService.user.typeUser != 'Mozo') {
      await this.auth.traerCliente().subscribe((doc) => {
        this.Usuario = doc[0];
        this.mesa = this.Usuario.mesa;
      });
    }
    await this.traerMensajes();
  }
}
