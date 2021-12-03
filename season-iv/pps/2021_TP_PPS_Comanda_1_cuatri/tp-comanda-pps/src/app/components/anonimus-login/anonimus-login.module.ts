import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonimusLoginComponent } from './anonimus-login.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnonimusLoginRoutingModule } from './anonimus-login-routing.module';
import { PhotosService } from 'src/app/services/photos.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerModule } from '../spinner/spinner.module';
import { AudioService } from 'src/app/services/audio.service';

@NgModule({
  declarations: [AnonimusLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AnonimusLoginRoutingModule,
    MaterialModule,
    SpinnerModule,
  ],
  providers: [
    MaterialModule,
    PhotosService,
    ToastService,
    AuthService,
    AudioService,
  ],
  exports: [AnonimusLoginComponent],
})
export class AnonimusLoginModule {}
