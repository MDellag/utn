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
import { MeComponent } from './me/me.component'
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component'
import { GameService } from '../services/game.service'
import { AhorcadoComponent } from './ahorcado/ahorcado.component'
import { PreguntadosComponent } from './preguntados/preguntados.component'
import { OwngameComponent } from './owngame/owngame.component'
import { DirectivesModule } from '../directives/directives.module'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MeComponent,
    MayorMenorComponent,
    AhorcadoComponent,
    PreguntadosComponent,
    OwngameComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    MaterialModule,
    RouterModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, NotificationService, GameService],
  exports: [LoginComponent],
})
export class PagesModule {}
