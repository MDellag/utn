import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LocalNotifications,
  ELocalNotificationTriggerUnit,
} from '@ionic-native/local-notifications/ngx';
import { CookieService } from 'ngx-cookie-service';
import {
  PushNotificationSchema,
  Token,
  ActionPerformed,
  PushNotifications,
  Channel,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { TypeUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  public static listaDevices = [];

  constructor(
    private ln: LocalNotifications,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.firestore
      .collection('devicesToken')
      .valueChanges()
      .subscribe((e: any) => {
        PushNotificationService.listaDevices = e;

        console.log(
          PushNotificationService.listaDevices.filter(
            (a) => a.typeUser === TypeUser.Supervisor
          )
        );
      });
  }

  getToken() {}

  public initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('My token: ' + JSON.stringify(token));
      this.firestore
        .collection('devicesToken')
        .doc(AuthService.user.id)
        .set({
          id: AuthService.user.id,
          deviceToken: token.value,
          typeUser: AuthService.user.typeUser || TypeUser.Anonimo,
        });
      // localStorage.setItem('deviceToken', JSON.stringify(token));
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log(
          'Action performed: ' + JSON.stringify(notification.notification)
        );
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }

  async postToken(obj: any) {
    console.log(obj);
    obj.token.forEach((e) => {
      this.http
        .post('https://fcm.googleapis.com/fcm/send', {
          notification: {
            title: obj.title,
            body: obj.message,
            sound: true,
            data: {
              'google.delivered_priority': 'high',
              'google.original_priority': 'high',
            },
          },
          to: e.deviceToken,
        })
        .toPromise();
    });

    // this.cookieService.set('userData', JSON.stringify(data), expireDate);
  }

  pushNotification(titulo: string, mensaje: string, segundos: number) {
    this.ln.schedule({
      title: titulo,
      text: mensaje,
      trigger: {
        in: segundos,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }
}
