import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltasRepartidorRoutingModule } from './altas-repartidor-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import { PaisesComponent } from './paises/paises.component';
import { AltasRepartidorComponent } from './altas-repartidor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [
    FormularioComponent,
    PaisesComponent,
    AltasRepartidorComponent,
  ],
  imports: [
    CommonModule,
    AltasRepartidorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthService],
  exports: [AltasRepartidorComponent],
})
export class AltasRepartidorModule {}
