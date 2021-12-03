import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocineroComponent } from './cocinero.component';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { PushNotificationService } from 'src/app/services/push-notification.service';
@NgModule({
  declarations: [CocineroComponent],
  imports: [CommonModule, SpinnerModule],
  providers: [AuthService, PushNotificationService],
  exports: [CocineroComponent],
})
export class CocineroModule {}
