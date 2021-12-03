import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  spinner: boolean = false;
  cred: Credentials = {
    email: '',
    password: '',
  };

  loggedIn: boolean = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly notif: NotificationService
  ) {}

  handleCred(type: string) {
    this.cred.email = type === 'admin' ? 'admin@mail.com' : 'empleado@mail.com';
    this.cred.password = '112233';
  }

  async login() {
    this.spinner = true;
    const user = await this.auth.login(this.cred);
    if (user) {
      this.spinner = false;
      if (user.type === 'Admin') {
        this.router.navigate(['/pizzas']);
      } else {
        this.router.navigate(['/altas-repartidor']);
      }
      this.notif.success('Bienvenido!', 4000);
    } else {
      this.notif.error(
        'error al ingresar al sistema, verifique sus credenciales'
      );
      this.spinner = false;
    }
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }

  ngOnInit(): void {
    const usr = this.auth.getCredentials();
    if (usr) {
      this.loggedIn = true;
    }
  }
}
