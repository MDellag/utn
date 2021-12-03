import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Message } from 'src/app/interfaces/chat'
import { ChatService } from 'src/app/services/chat.service'
import { NotificationService } from 'src/app/services/notification.service'
import * as moment from 'moment'

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  messages: Message[] = []
  message: string = ''
  fetching: boolean = true

  constructor(
    private readonly chatService: ChatService,
    private readonly notif: NotificationService
  ) {}

  sendMessageOnEnter(event: any) {
    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendMessage(this.message)
      this.message = ''
    } else this.notif.error('Not a message to send!', 4000)
  }

  ngOnInit(): void {
    this.chatService.observeMessages().subscribe((value) => {
      this.messages = value
      if (this.fetching) this.fetching = false
    })
  }

  ngAfterViewInit(): void {}
}
