import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetreComponent } from './metre.component';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@NgModule({
  declarations: [MetreComponent],
  imports: [CommonModule, FormsModule],
  providers: [AuthService, PushNotificationService],
  exports: [MetreComponent],
})
export class MetreModule {}
