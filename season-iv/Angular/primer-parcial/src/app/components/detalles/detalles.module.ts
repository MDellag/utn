import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesRoutingModule } from './detalles-routing.module';
import { DetallesComponent } from './detalles.component';
import { DatosPaisRepartoComponent } from './datos-pais-reparto/datos-pais-reparto.component';
import { DetalleRepartidorComponent } from './detalle-repartidor/detalle-repartidor.component';
import { ListadoRepartidoresComponent } from './listado-repartidores/listado-repartidores.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@NgModule({
  declarations: [
    DetallesComponent,
    DatosPaisRepartoComponent,
    DetalleRepartidorComponent,
    ListadoRepartidoresComponent,
  ],
  imports: [CommonModule, DetallesRoutingModule],
  providers: [AuthService, RequestService],
})
export class DetallesModule {}
