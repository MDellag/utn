import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Repartidor } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalle-repartidor',
  templateUrl: './detalle-repartidor.component.html',
  styleUrls: ['./detalle-repartidor.component.scss'],
})
export class DetalleRepartidorComponent implements OnInit, OnChanges {
  repartidor!: Repartidor;
  @Input('dni') dniRepartidor!: number;
  @Output('paisReparto') paisReparto: EventEmitter<string> = new EventEmitter();

  constructor(private auth: AuthService) {}

  async ngOnChanges(changes: SimpleChanges) {
    this.repartidor = await this.auth.getRepartidorByDni(
      changes.dniRepartidor.currentValue
    );

    this.paisReparto.emit(this.repartidor.paisProducto);
  }

  async ngOnInit(): Promise<void> {}
}
