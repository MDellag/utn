import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesaPageRoutingModule } from './mesa-routing.module';

import { MesaPage } from './mesa.page';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { AudioService } from 'src/app/services/audio.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MesaPageRoutingModule],
  declarations: [MesaPage],
  providers: [PushNotificationService, AudioService],
})
export class MesaPageModule {}
