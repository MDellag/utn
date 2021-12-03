import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozoComponent } from './mozo.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@NgModule({
  declarations: [MozoComponent],
  imports: [CommonModule, FormsModule, RouterModule, SpinnerModule],
  providers: [AuthService, ToastService, PushNotificationService],
  exports: [MozoComponent],
})
export class MozoModule {}
