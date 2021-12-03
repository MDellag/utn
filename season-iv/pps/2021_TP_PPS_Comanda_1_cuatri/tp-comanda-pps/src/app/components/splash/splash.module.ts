import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash.component';
import { RouterModule } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';

@NgModule({
  declarations: [SplashComponent],
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [SplashComponent, AudioService],
})
export class SplashModule {}
