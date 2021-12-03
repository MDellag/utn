import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoggedGuard } from './guards/logged.guard'
import { MasterGuard } from './guards/master.guard'
import { TypeUser } from './interfaces/users'
import { InformesComponent } from './pages/informes/informes.component'
import { LoginComponent } from './pages/login/login.component'
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component'
import { PacientesComponent } from './pages/pacientes/pacientes.component'
import { PerfilComponent } from './pages/perfil/perfil.component'
import { RegisterComponent } from './pages/register/register.component'
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component'
import { TurnosComponent } from './pages/turnos/turnos.component'
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component'
import { UsersComponent } from './pages/users/users.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      animation: 'isRight',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      animation: 'isRight',
    },
  },
  {
    path: 'registro',
    component: RegisterComponent,
    data: {
      animation: 'isRight',
    },
  },

  {
    path: 'usuarios',
    component: UsersComponent, // Admins
    canActivate: [MasterGuard],
    data: {
      syncGuards: [TypeUser.ADMIN],
      animation: 'isLeft',
    },
  },
  {
    path: 'mis-turnos',
    component: MisTurnosComponent, //paciente - especialista
    canActivate: [MasterGuard],
    data: {
      syncGuards: [TypeUser.PATIENT, TypeUser.SPECIALIST],
      animation: 'isLeft',
    },
  },
  {
    path: 'solicitar-turno',
    component: SolicitarTurnoComponent, //paciente - Admins
    canActivate: [MasterGuard],
    data: {
      syncGuards: [TypeUser.ADMIN, TypeUser.PATIENT],
      animation: 'isLeft',
    },
  },
  {
    path: 'turnos',
    component: TurnosComponent, //Admins
    canActivate: [MasterGuard],
    data: {
      syncGuards: [TypeUser.ADMIN],
      animation: 'isLeft',
    },
  },
  {
    path: 'perfil',
    component: PerfilComponent, //TODOS
    canActivate: [LoggedGuard],
    data: {
      animation: 'isLeft',
    },
  },
  {
    path: 'pacientes', // especialistas
    component: PacientesComponent,
    canActivate: [MasterGuard],
    data: {
      syncGuards: [TypeUser.SPECIALIST],
      animation: 'isLeft',
    },
  },

  {
    path: 'informes', // Admins
    component: InformesComponent,
    canActivate: [MasterGuard],
    data: {
      syncGuards: [TypeUser.ADMIN],
      animation: 'isLeft',
    },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
