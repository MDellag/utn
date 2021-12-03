import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HacerConsultaComponent } from './hacer-consulta.component';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@NgModule({
  declarations: [HacerConsultaComponent],
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  providers: [AuthService, MaterialModule, PushNotificationService],
  exports: [HacerConsultaComponent],
})
export class HacerConsultaModule {}
