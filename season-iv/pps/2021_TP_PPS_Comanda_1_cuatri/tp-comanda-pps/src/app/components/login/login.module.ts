import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { SpinnerModule } from '../spinner/spinner.module';
import { AudioService } from 'src/app/services/audio.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    SpinnerModule,
  ],
  providers: [MaterialModule, ToastService, AudioService],
  exports: [LoginComponent],
})
export class LoginModule {}
