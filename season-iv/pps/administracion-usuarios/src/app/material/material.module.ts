/* eslint-disable @typescript-eslint/naming-convention */
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

const Material = [
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
]

@NgModule({
    declarations: [],
    imports: [CommonModule, Material],
    providers: [Material],
    exports: [Material],
})
export class MaterialModule {}
