import { ThisReceiver } from '@angular/compiler'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private games: { [key: string]: () => void } = {
    'higher-lower': () => this.router.navigate(['higher-lower']),
    ahorcado: () => this.router.navigate(['ahorcado']),
    preguntados: () => this.router.navigate(['preguntados']),
    owngame: () => this.router.navigate(['owngame']),
  }

  constructor(private readonly router: Router) {}

  redirect(url: string) {
    this.games[url]()
  }

  ngOnInit(): void {}
}
