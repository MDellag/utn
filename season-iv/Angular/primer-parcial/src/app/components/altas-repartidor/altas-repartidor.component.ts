import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Repartidor } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-altas-repartidor',
  templateUrl: './altas-repartidor.component.html',
  styleUrls: ['./altas-repartidor.component.scss'],
})
export class AltasRepartidorComponent implements OnInit {
  country: string = '';
  spinner: boolean = false;

  constructor(
    private readonly auth: AuthService,
    private readonly notif: NotificationService,
    private readonly router: Router
  ) {}

  handleCountryResponse(pais: string): void {
    this.country = pais;
  }

  async handleAltaData(data: Repartidor) {
    this.spinner = !this.spinner;
    await this.auth.addRepartidor(data);
    this.spinner = !this.spinner;
    this.router.navigate(['']);
    this.notif.success('Repartidor cargado con exito', 5000);
  }

  ngOnInit(): void {}
}
