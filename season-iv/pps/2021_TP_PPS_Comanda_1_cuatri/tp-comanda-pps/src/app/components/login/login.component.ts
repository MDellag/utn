import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  correo: string = '';
  password: string = '';
  private isFetchingData: boolean = false;
  private typeUser = '';
  private usuario;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    public router: Router,
    private toast: ToastService,
    private firestore: AngularFirestore,
    private audio: AudioService
  ) {}

  ngOnInit() {}

  async logInUser() {
    if (this.correo == '') {
      this.toast.showToastDanger('Por favor, ingrese su correo.');
      this.audio.play('error');
    } else if (this.password == '') {
      this.toast.showToastDanger('Por favor, ingrese su clave.');
      this.audio.play('error');
    } else if (this.correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) == null) {
      this.toast.showToastDanger('Formato de correo inválido.');
      this.audio.play('error');
      return;
    } else {
      try {
        this.isFetchingData = true;
        await this.authService.logInUser(this.correo, this.password);
        this.isFetchingData = false;
        this.manejarLoginExitoso();
      } catch (error) {
        this.isFetchingData = false;
        console.log('LogInComponent.ts ==> logInUser() error: ', error.code);
        this.audio.play('error');
        this.toast.showToastDanger(this.traducirErrorCode(error.code));
      }
    }
  }

  traducirErrorCode(codigo: string): string {
    const message = {
      'auth/invalid-email': '¡Ingrese un correo válido!',
      'auth/user-not-found':
        'No existe un usuario con dicho correo electrónico.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/weak-password': 'Contraseña debe tener almenos 6 caracteres',
      '409': 'Cuenta aun no validada!!',
    };
    return message[codigo] || 'Error en login';
  }

  ingresoAnonimo() {
    this.router.navigate(['ingreso-anonimo']);
  }

  manejarLoginExitoso() {
    this.traerUserInfo().then((usr) => {
      this.usuario = usr;
      console.log(
        'LogInComponent.ts ==> manejarLoginExitoso() this.usuario.typeUser: ',
        this.usuario.typeUser
      );
      if (
        this.usuario.typeUser == 'Anonimo' ||
        this.usuario.typeUser == 'Registrado'
      ) {
        //console.log(JSON.stringify(this.usuario));
        this.router.navigate(['/home']);
      } else if (
        this.usuario.typeUser == 'Dueño' ||
        this.usuario.typeUser == 'Supervisor'
      ) {
        //alert("soy un supervisor");
        this.router.navigate(['/supervisor']);
      } else if (this.usuario.typeUser == 'Metre') {
        //console.log(JSON.stringify(this.usuario));
        this.router.navigate(['/metre']);
      } else if (this.usuario.typeUser == 'Mozo') {
        this.router.navigate(['/mozo']);
      } else if (this.usuario.typeUser == 'Bartender') {
        this.router.navigate(['/bartender']);
      } else if (this.usuario.typeUser == 'Cocinero') {
        this.router.navigate(['/cocinero']);
      } else {
      }
    });
  }

  traerUserInfo(
    collection: string = 'clientes',
    recursive: boolean = true,
    segundo: string = 'users'
  ) {
    let usuario;
    return new Promise((resolve, reject) =>
      this.firestore
        .collection(collection, (ref) => ref.where('email', '==', this.correo))
        .valueChanges()
        .subscribe((data) => {
          if (data.length > 0) {
            usuario = data[0];
            resolve(usuario);
          } else if (recursive) {
            this.traerUserInfo(segundo, false)
              .then((dataRec) => {
                resolve(dataRec);
              })
              .catch(() => {
                reject(null);
              });
          } else {
            reject(null);
          }
        })
    );
  }

  insertarDatos(datos: String) {
    switch (datos) {
      case 'Supervisor':
        this.correo = 'supervisor@gmail.com';
        this.password = 'supervisor';
        break;
      case 'Cocinero':
        this.correo = 'cocinero@gmail.com';
        this.password = 'cocinero';

        break;
      case 'Mozo':
        this.correo = 'mozo@gmail.com';
        this.password = 'mozo12';

        break;
      case 'Metre':
        this.correo = 'metre@gmail.com';
        this.password = 'metre1';

        break;
      case 'Bartender':
        this.correo = 'bartender@gmail.com';
        this.password = '123456';
        break;
      case 'Cliente':
        this.correo = 'mauro.hfd@gmail.com';
        this.password = '123456';

        break;
    }
  }
}
