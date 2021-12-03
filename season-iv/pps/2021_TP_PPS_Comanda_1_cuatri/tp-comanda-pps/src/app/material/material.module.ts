import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ---- Material ----
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const material = [
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, material],
  providers: [material],
  exports: [material],
})
export class MaterialModule {}
