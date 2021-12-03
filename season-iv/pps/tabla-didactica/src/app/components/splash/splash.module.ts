import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SplashComponent],
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [SplashComponent],
})
export class SplashModule {}
