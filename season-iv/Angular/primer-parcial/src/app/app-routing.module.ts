import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'altas-repartidor',
    loadChildren: () =>
      import('./components/altas-repartidor/altas-repartidor.module').then(
        (m) => m.AltasRepartidorModule
      ),
  },
  {
    path: 'detalles-repartidor',
    loadChildren: () =>
      import('./components/detalles/detalles.module').then(
        (m) => m.DetallesModule
      ),
  },
  {
    path: 'pizzas',
    loadChildren: () =>
      import('./components/pizzas/pizzas.module').then((m) => m.PizzasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
