import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MyphotosComponent } from './myphotos.component'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { MaterialModule } from 'src/app/material/material.module'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [MyphotosComponent],
    imports: [FormsModule, CommonModule, RouterModule, MaterialModule],
    providers: [AuthService, NotificationsService, MaterialModule],
    exports: [MyphotosComponent],
})
export class MyphotosModule {}
