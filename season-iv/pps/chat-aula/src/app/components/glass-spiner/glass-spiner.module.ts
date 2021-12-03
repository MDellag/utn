import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { GlassSpinerComponent } from './glass-spiner.component';

@NgModule({
  declarations: [GlassSpinerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [GlassSpinerComponent],
})
export class GlassSpinerModule {}
