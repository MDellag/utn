import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '../material/material.module'
import { RouterModule } from '@angular/router'
import { SpinnerComponent } from './spinner/spinner.component'
import { AuthService } from '../services/auth.service'
import { ChatComponent } from './chat/chat.component'
import { DirectivesModule } from '../directives/directives.module'
import { SidenavComponent } from './sidenav/sidenav.component'
import { DialogComponent } from './dialog/dialog.component'

const components = [
  SpinnerComponent,
  ChatComponent,
  SidenavComponent,
  DialogComponent,
]
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    RouterModule,
    DirectivesModule,
  ],
  providers: [AuthService],
  exports: [...components],
})
export class ComponentsModule {}
