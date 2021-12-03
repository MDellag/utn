import { Injectable } from '@angular/core'
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database'
import { Observable } from 'rxjs'
import { Message } from '../interfaces/chat'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: Observable<Message[]>
  private chatRef: AngularFireList<Message>

  constructor(private readonly db: AngularFireDatabase) {
    this.chatRef = db.list('messages')
    this.messages = this.chatRef.valueChanges()
  }

  sendMessage(message: string): void {
    this.chatRef.push({
      message,
      email: AuthService.user.email,
      name: AuthService.user.name,
      date: Date.now(),
      type: AuthService.user.type,
    })
  }

  observeMessages(): Observable<Message[]> {
    return this.messages
  }
}
