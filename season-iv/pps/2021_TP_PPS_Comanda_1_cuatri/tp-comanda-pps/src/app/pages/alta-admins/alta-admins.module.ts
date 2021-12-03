import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AltaAdminsComponent } from './alta-admins.component';
import { AltaAdminsRoutingModule } from './alta-admins-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaAdminsRoutingModule,
    MaterialModule,
  ],
  declarations: [AltaAdminsComponent],
  providers: [MaterialModule],
  exports: [AltaAdminsComponent],
})
export class AltaAdminsModule {}
