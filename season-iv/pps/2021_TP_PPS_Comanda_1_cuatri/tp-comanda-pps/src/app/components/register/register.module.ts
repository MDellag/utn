import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { RegisterPageRoutingModule } from './register-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { PhotosService } from 'src/app/services/photos.service';
import { SpinnerModule } from '../spinner/spinner.module';
import { AudioService } from 'src/app/services/audio.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RegisterPageRoutingModule,
    SpinnerModule,
  ],
  providers: [MaterialModule, AuthService, PhotosService, AudioService],
  exports: [RegisterComponent],
})
export class RegisterModule {}
