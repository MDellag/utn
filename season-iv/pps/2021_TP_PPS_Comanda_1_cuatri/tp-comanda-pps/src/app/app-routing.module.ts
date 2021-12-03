import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EncuestaPage } from './components/encuesta/encuesta.page';
import { HacerConsultaComponent } from './components/hacer-consulta/hacer-consulta.component';
import { ListaPagosComponent } from './components/lista-pagos/lista-pagos.component';
import { LoginComponent } from './components/login/login.component';
import { SplashComponent } from './components/splash/splash.component';
import { AuthGuard } from './guards/auth.guard';
import { BartenderComponent } from './pages/bartender/bartender.component';
import { CocineroComponent } from './pages/cocinero/cocinero.component';
import { MetreComponent } from './pages/metre/metre.component';
import { MozoComponent } from './pages/mozo/mozo.component';
import { ClientePage } from './components/cliente/cliente.page';
import { SplashScreen } from '@capacitor/splash-screen';
import { EstadisticasPage } from './components/estadisticas/estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
    // loadChildren: () =>
    //   import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'supervisor',
    loadChildren: () =>
      import('./components/supervisor/supervisor.module').then(
        (m) => m.SupervisorPageModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./components/cliente/cliente.module').then(
        (m) => m.ClientePageModule
      ),
  },
  {
    path: 'mesa',
    loadChildren: () =>
      import('./components/mesa/mesa.module').then((m) => m.MesaPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'alta-admins',
    loadChildren: () =>
      import('./pages/alta-admins/alta-admins.module').then(
        (m) => m.AltaAdminsModule
      ),
  },
  {
    path: 'ingreso-anonimo',
    loadChildren: () =>
      import('./components/anonimus-login/anonimus-login.module').then(
        (m) => m.AnonimusLoginModule
      ),
  },
  {
    path: 'metre',
    component: MetreComponent,
  },
  {
    path: 'lista-pagos',
    component: ListaPagosComponent,
  },
  {
    path: 'mozo',
    component: MozoComponent,
  },
  {
    path: 'bartender',
    component: BartenderComponent,
  },
  {
    path: 'cocinero',
    component: CocineroComponent,
  },
  {
    path: 'consulta',
    component: HacerConsultaComponent,
  },
  {
    path: 'encuesta',
    component: EncuestaPage,
    
  },
  {
    path: 'estadisticas',
    loadChildren: () =>
      import('./components/estadisticas/estadisticas.module').then(
        (m) => m.EstadisticasPageModule
      ),
  },
  {
    path: '**',
    component: SplashComponent,
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
