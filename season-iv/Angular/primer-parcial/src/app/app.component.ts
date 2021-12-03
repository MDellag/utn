import { Component, OnInit } from '@angular/core';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  screen = 'Bienvenido';

  constructor(private readonly req: RequestService) {}

  async ngOnInit(): Promise<void> {}
}
