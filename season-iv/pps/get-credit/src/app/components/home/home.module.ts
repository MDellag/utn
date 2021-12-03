import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  providers: [AuthService, NotificationsService, MaterialModule],
  exports: [HomeComponent],
})
export class HomeModule {}
