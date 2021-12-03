import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AltasComponent } from './altas.component'
import { MaterialModule } from 'src/app/material/material.module'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { FormsModule } from '@angular/forms'
import { PhotosService } from 'src/app/services/photos.service'
import { GlassSpinerModule } from '../glass-spiner/glass-spiner.module'

@NgModule({
    declarations: [AltasComponent],
    imports: [CommonModule, MaterialModule, FormsModule, GlassSpinerModule],
    providers: [AuthService, NotificationsService, PhotosService],
    exports: [AltasComponent],
})
export class AltasModule {}
