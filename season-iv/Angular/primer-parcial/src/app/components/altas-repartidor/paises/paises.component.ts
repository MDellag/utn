import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss'],
})
export class PaisesComponent implements OnInit {
  @Output('pais')
  country: EventEmitter<string> = new EventEmitter();
  countryList: any = [];
  fetching: boolean = false;

  constructor(private readonly http: RequestService) {}

  async getCountries(region: string) {
    this.fetching = !this.fetching;
    const resp: any = await this.http.getCountriesData(region);
    this.countryList = resp.slice(0, 20);
    this.fetching = !this.fetching;
  }

  emitPais(country: string) {
    this.country.emit(country);
  }

  async ngOnInit(): Promise<void> {
    await this.getCountries('europe');
  }
}
