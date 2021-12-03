import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterGuard } from 'src/app/guards/master.guard';
import { PizzasComponent } from './pizzas.component';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent,
    canActivate: [MasterGuard],
    data: {
      syncGuards: ['Admin'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzasRoutingModule {}
