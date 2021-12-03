import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Repartidor } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listado-repartidores',
  templateUrl: './listado-repartidores.component.html',
  styleUrls: ['./listado-repartidores.component.scss'],
})
export class ListadoRepartidoresComponent implements OnInit {
  listRepartidores: Repartidor[] = [];

  @Output('dniRepartidor')
  dniRepartidor: EventEmitter<number> = new EventEmitter();
  constructor(private readonly auth: AuthService) {}

  handleRepartidor(dni: number) {
    this.dniRepartidor.emit(dni);
  }

  async ngOnInit(): Promise<void> {
    this.listRepartidores = await this.auth.getRepartidores();
    this.handleRepartidor(this.listRepartidores[0].dni);
  }
}
