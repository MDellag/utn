import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { IMessage } from '../interfaces/imessage'
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root',
})
export class MessagesService {
    constructor(private firebase: AngularFirestore) {}

    sendMessage(message: IMessage) {
        this.firebase
            .collection('messages')
            .doc(Date.now().toString())
            .set(message)
    }

    getObservableMessages() {
        return this.firebase.collection('messages').valueChanges()
    }
}
