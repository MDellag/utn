import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { ComponentsModule } from '../components/components.module'
import { MaterialModule } from '../material/material.module'
import { RouterModule } from '@angular/router'
import { RegisterComponent } from './register/register.component'
import { AuthService } from '../services/auth.service'
import { NotificationService } from '../services/notification.service'
import { HomeComponent } from './home/home.component'

import { DirectivesModule } from '../directives/directives.module'

import { NgxMatFileInputModule } from '@angular-material-components/file-input'
import { PagesRoutingModule } from './pages-routing.module'

import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha'

import { environment } from 'src/environments/environment'
import { UsersComponent } from './users/users.component'
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component'
import { TurnosService } from '../services/turnos.service'
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component'
import { TurnosComponent } from './turnos/turnos.component'
import { PerfilComponent } from './perfil/perfil.component'
import { PacientesComponent } from './pacientes/pacientes.component'
import { HistoriaClinicaService } from '../services/historia-clinica.service'
import { ExportService } from '../services/export.service'
import { InformesComponent } from './informes/informes.component'
import { LogsService } from '../services/logs.service'
import { ChartsModule } from 'ng2-charts'
import { PipesModule } from '../pipes/pipes.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HorariosComponent } from './solicitar-turno/horarios/horarios.component'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    TurnosComponent,
    PerfilComponent,
    PacientesComponent,
    InformesComponent,
    UnauthorizedComponent,
    HorariosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    MaterialModule,
    RouterModule,
    DirectivesModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PagesRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ChartsModule,
    PipesModule,
  ],
  providers: [
    AuthService,
    NotificationService,
    TurnosService,
    HistoriaClinicaService,
    ExportService,
    LogsService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  exports: [LoginComponent],
})
export class PagesModule {}
