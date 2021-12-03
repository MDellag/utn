import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IWallet } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public ammount: number;
  private dbpath = '/wallet';
  private accountRef: AngularFirestoreCollection<any>;
  private doc;
  private typeUser  = '';
  typeUsuario = {
    User: 'Usuario',
    Admin: 'Administrador'
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly CODES_DECRIPTED = {
    '8c95def646b6127282ed50454b73240300dccabc': 10,
    'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ': 50,
    '2786f4877b9091dcad7f35751bfcf5d5ea712b2f': 100,
  };

  constructor(
    private firebase: AngularFirestore,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly notif: NotificationsService,
  ) {
    this.typeUser = AuthService.userWallet.type;
    this.accountRef = this.firebase.collection(this.dbpath);
    this.doc = this.firebase
      .collection('wallet')
      .snapshotChanges()
      .subscribe(async () => {
        const data = await this.auth.getWalletByUsername(
          AuthService.userWallet.username
        );
        this.ammount = AuthService.userWallet.amount;
      });
  }

  async scannQR() {
    const text = await this.auth.scanQR();
    const amountQrs = AuthService.userWallet.qrs.filter(item => item === text).length;

    console.log(AuthService.userWallet);
    console.log(AuthService.userWallet.type);
    console.log(AuthService.userWallet.qrs);
    if (AuthService.userWallet.type === 'User' && !AuthService.userWallet.qrs.includes(text)) {
      this.increaseAmount(text);
    } else if(AuthService.userWallet.type === 'Admin' && amountQrs < 2){
      this.increaseAmount(text);
    } else {
      this.notif.notificationError(
      'Este codigo QR ya ha sido utilizado! :(',
      2000
      );
    }

  }

  quit(){
    const userWallet: IWallet = {
      username: '',
      amount: 0,
      qrs: [],
      type: ''
    };

    AuthService.userWallet = userWallet;
    this.router.navigate(['login']);
  }

  increaseAmount(qrCode: string){
    let value: number = AuthService.userWallet.amount;
    value += this.CODES_DECRIPTED[qrCode] || 0;
    this.auth.addMoney(value, qrCode);
  }

  reset() {
    AuthService.userWallet.amount = 0;
    AuthService.userWallet.qrs = [];
    this.auth.resetWallet();
  }

  async ngOnInit() {}
}
