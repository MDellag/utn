import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitGuard } from 'src/app/guards/exit.guard';
import { MasterGuard } from 'src/app/guards/master.guard';
import { AltasRepartidorComponent } from './altas-repartidor.component';

const routes: Routes = [
  {
    path: '',
    component: AltasRepartidorComponent,
    canActivate: [MasterGuard],
    data: {
      syncGuards: ['Empleado', 'Admin'],
    },
    canDeactivate: [ExitGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltasRepartidorRoutingModule {}
