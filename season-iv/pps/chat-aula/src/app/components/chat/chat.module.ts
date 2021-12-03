import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatComponent } from './chat.component'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/material/material.module'
import { MessagesService } from 'src/app/services/messages.service'

@NgModule({
    declarations: [ChatComponent],
    imports: [CommonModule, FormsModule, MaterialModule],
    providers: [AuthService, NotificationsService, MessagesService],
    exports: [ChatComponent],
})
export class ChatModule {}
