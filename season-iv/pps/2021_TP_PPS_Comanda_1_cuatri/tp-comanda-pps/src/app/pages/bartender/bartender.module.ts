import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BartenderComponent } from './bartender.component';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@NgModule({
  declarations: [BartenderComponent],
  imports: [CommonModule],
  providers: [AuthService, PushNotificationService],
  exports: [BartenderComponent],
})
export class BartenderModule {}
