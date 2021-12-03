import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) {}

  getGithubData() {
    return this.http.get('https://api.github.com/users/MDellag').toPromise();
  }

  getCountriesData(region: string) {
    return this.http
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .toPromise();
  }

  getCountry(country: string) {
    return this.http
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .toPromise();
  }
}
