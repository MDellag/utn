import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
  repartidorSelected!: number;
  paisReparto!: string;

  constructor() {}

  handleRepartidor(dni: number) {
    this.repartidorSelected = dni;
  }

  handlePaisReparto(paisReparto: string) {
    console.log(paisReparto);
    this.paisReparto = paisReparto;
  }

  ngOnInit(): void {}
}
