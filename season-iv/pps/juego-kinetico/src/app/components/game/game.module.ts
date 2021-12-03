import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GameComponent } from './game.component'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { MotionService } from 'src/app/services/motion.service'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/material/material.module'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [GameComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        IonicModule,
        RouterModule,
    ],
    providers: [AuthService, NotificationsService, MotionService],
    exports: [GameComponent],
})
export class GameModule {}
