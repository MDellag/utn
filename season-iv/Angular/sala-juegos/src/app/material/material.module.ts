import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// ---- Material ----
import { MatInputModule } from '@angular/material/input'
import { MatSliderModule } from '@angular/material/slider'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'

const Material = [
  MatInputModule,
  MatSliderModule,
  MatButtonModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSidenavModule,
  MatSelectModule,
]

@NgModule({
  declarations: [],
  imports: [CommonModule, Material],
  providers: [Material],
  exports: [Material],
})
export class MaterialModule {}
