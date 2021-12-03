import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component'
import { MeComponent } from './pages/me/me.component'
import { OwngameComponent } from './pages/owngame/owngame.component'
import { PreguntadosComponent } from './pages/preguntados/preguntados.component'
import { RegisterComponent } from './pages/register/register.component'

const routes: Routes = [
  {
    path: '',
    component: MeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'higher-lower',
    component: MayorMenorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ahorcado',
    component: AhorcadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'owngame',
    component: OwngameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: MeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
