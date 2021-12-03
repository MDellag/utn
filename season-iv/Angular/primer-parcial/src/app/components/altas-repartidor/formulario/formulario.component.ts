import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  @Input('paisProducto') paisProducto!: string;
  @Output('values')
  values: EventEmitter<any> = new EventEmitter();
  unidadPropia: boolean = false;

  constructor(private readonly notif: NotificationService) {}

  altasForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    paisOrigen: new FormControl('', Validators.required),
  });

  onSubmit(event: any) {
    if (this.altasForm.invalid || !this.paisProducto) {
      this.notif.error(
        'Debe elegir pais de producto y cargar correctamente los datos'
      );
    } else {
      const data: any = {
        dni: this.altasForm.value.dni,
        nombre: this.altasForm.value.nombre,
        edad: this.altasForm.value.edad,
        capacidad: this.altasForm.value.capacidad,
        paisOrigen: this.altasForm.value.paisOrigen,
        unidadPropia: this.unidadPropia,
        paisProducto: this.paisProducto,
      };
      this.values.emit(data);
    }
  }

  ngOnInit(): void {}
}
