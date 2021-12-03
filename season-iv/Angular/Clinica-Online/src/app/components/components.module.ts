import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '../material/material.module'
import { RouterModule } from '@angular/router'
import { SpinnerComponent } from './spinner/spinner.component'
import { AuthService } from '../services/auth.service'
import { DirectivesModule } from '../directives/directives.module'
import { SidenavComponent } from './sidenav/sidenav.component'
import { DialogComponent } from './dialog/dialog.component'
import { SurveyComponent } from './survey/survey.component'
import { DialogDisponibilidadComponent } from './dialog-disponibilidad/dialog-disponibilidad.component'
import { HistoryComponent } from './history/history.component'
import { DialogHistoryComponent } from './dialog-history/dialog-history.component'
import { ChartTurnSpecialityComponent } from './chart-turn-speciality/chart-turn-speciality.component'
import { LogsService } from '../services/logs.service'
import { ChartsModule } from 'ng2-charts'
import { TurnosService } from '../services/turnos.service'
import { ExportService } from '../services/export.service'
import { ChartTurnDayComponent } from './chart-turn-day/chart-turn-day.component'
import { ChartTurnSpecialistsComponent } from './chart-turn-specialists/chart-turn-specialists.component'
import { ChartTurnFinishedBySpecialistComponent } from './chart-turn-finished-by-specialist/chart-turn-finished-by-specialist.component'
import { PipesModule } from '../pipes/pipes.module'
import { ButtonUsersComponent } from './button-users/button-users.component'
import { CardUsersComponent } from './card-users/card-users.component'
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts'
import * as exporting from 'highcharts/modules/exporting.src'

const components = [
  SpinnerComponent,
  SidenavComponent,
  DialogComponent,
  SurveyComponent,
  DialogDisponibilidadComponent,
  HistoryComponent,
  DialogHistoryComponent,
  ChartTurnSpecialityComponent,
  ChartTurnDayComponent,
  ChartTurnSpecialistsComponent,
  ChartTurnFinishedBySpecialistComponent,
  ButtonUsersComponent,
  CardUsersComponent,
]
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    DirectivesModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule,
    ChartModule,
  ],
  providers: [
    AuthService,
    LogsService,
    TurnosService,
    ExportService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [exporting] },
  ],
  exports: [...components],
})
export class ComponentsModule {}
