import { Injectable } from '@angular/core'
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { NotificationsService } from './notifications.service'
import { IUser } from '../interfaces/iuser'

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
        private readonly notif: NotificationsService
    ) {}

    async logInUser(mail: string, password: string): Promise<Boolean> {
        try {
            await this.getUserFirebase(mail, password)
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

    async saveGameData(record: any) {
        console.log(AuthService.user.id)
        const snap: any = await this.firebase
            .collection('game')
            .ref.where('id', '==', AuthService.user.id)
            .get()

        const dat = snap.docs[0]
        const data = dat.data()
        if (data.record < record || !data) {
            await this.firebase
                .collection('game')
                .doc(AuthService.user.id)
                .set({
                    id: AuthService.user.id,
                    name: AuthService.user.name,
                    record: record,
                })
        }
    }

    getGameData() {
        return this.firebase.collection('game').valueChanges()
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
