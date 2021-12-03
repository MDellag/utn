import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EncuestaPageRoutingModule } from './encuesta-routing.module';
import { EncuestaPage } from './encuesta.page';
import { SpinnerModule } from '../spinner/spinner.module';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestaPageRoutingModule,
    SpinnerModule,
  ],
  declarations: [EncuestaPage],
  providers: [ToastService, AuthService],
  exports: [EncuestaPage],
})
export class EncuestaModule {}
