import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PushNotificationService } from '../services/push-notification.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MaterialModule,
  ],
  declarations: [HomePage],
  providers: [
    MaterialModule,
    AuthService,
    CookieService,
    PushNotificationService,
  ],
})
export class HomePageModule {}
