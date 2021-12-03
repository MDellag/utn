import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GlassSpinerModule } from '../glass-spiner/glass-spiner.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    GlassSpinerModule,
  ],
  providers: [AuthService],
  exports: [LoginComponent],
})
export class LoginModule {}
