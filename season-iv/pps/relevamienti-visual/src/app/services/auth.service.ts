import { Injectable } from '@angular/core'
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { NotificationsService } from './notifications.service'
import { IUser } from '../interfaces/iuser'
import { PhotoService } from './photo.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public static user: IUser = {
        id: '',
        mail: '',
        password: '',
        name: '',
        type: '',
        genre: '',
    }

    constructor(
        private firebase: AngularFirestore,
        private photo: PhotoService,
        private readonly notif: NotificationsService
    ) {}

    async logInUser(mail: string, password: string): Promise<Boolean> {
        try {
            await this.getUserFirebase(mail, password)
            await this.photo.getUserPhotos()
            return true
        } catch (err) {
            throw err
        }
    }

    async getUserFirebase(mail: string, password: string) {
        try {
            const snap = await this.firebase
                .collection('usuarios')
                .ref.where('mail', '==', mail)
                .get()
            const doc = snap.docs[0]
            const data = doc.data()
            AuthService.user = <IUser>data
            if (password !== AuthService.user.password)
                throw new Error('Contraseña Incorrecta!')
        } catch (err) {
            throw err
        }
    }

    logOut() {
        AuthService.user = {
            id: '',
            mail: '',
            password: '',
            name: '',
            type: '',
            genre: '',
        }
    }
}
