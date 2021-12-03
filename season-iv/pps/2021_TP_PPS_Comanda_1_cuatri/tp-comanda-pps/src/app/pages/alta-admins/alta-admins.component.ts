import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-admins',
  templateUrl: './alta-admins.component.html',
  styleUrls: ['./alta-admins.component.scss'],
})
export class AltaAdminsComponent implements OnInit {
  private mail: string = '';
  private name: string = '';
  private lastname: string = '';
  private dni: string = '';
  private password: string = '';

  constructor() {}

  submitRequest(): void {}

  ngOnInit() {}
}
