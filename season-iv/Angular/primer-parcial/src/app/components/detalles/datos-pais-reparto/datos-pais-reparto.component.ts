import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-datos-pais-reparto',
  templateUrl: './datos-pais-reparto.component.html',
  styleUrls: ['./datos-pais-reparto.component.scss'],
})
export class DatosPaisRepartoComponent implements OnInit, OnChanges {
  @Input('paisReparto') paisReparto!: string;
  pais!: any;

  constructor(private http: RequestService) {}

  async ngOnChanges(changes: SimpleChanges) {
    const data: any = await this.http.getCountry(
      changes.paisReparto.currentValue
    );
    this.pais = data[0];
    console.log(this.pais);
  }

  ngOnInit(): void {}
}
