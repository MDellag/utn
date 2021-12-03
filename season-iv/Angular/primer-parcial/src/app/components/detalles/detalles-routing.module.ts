import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterGuard } from 'src/app/guards/master.guard';
import { DetallesComponent } from './detalles.component';

const routes: Routes = [
  {
    path: '',
    component: DetallesComponent,
    canActivate: [MasterGuard],
    data: {
      syncGuards: ['Empleado', 'Admin'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesRoutingModule {}
