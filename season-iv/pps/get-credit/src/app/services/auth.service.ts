import { Injectable } from '@angular/core'
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { BehaviorSubject } from 'rxjs'
import { IWallet, UserCredentials } from '../interfaces/users'
import { NotificationsService } from './notifications.service'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public static userDocument: string
    public static userWallet: IWallet = {
        username: '',
        amount: 0,
        qrs: [],
        type: '',
    }

    userLoged = false
    private usuario: any
    private dbpath = '/users'
    private userRef: AngularFirestoreCollection<UserCredentials>

    constructor(
        private firebase: AngularFirestore,
        private readonly notif: NotificationsService,
        private readonly barcodeScanner: BarcodeScanner
    ) {
        this.userRef = firebase.collection(this.dbpath)
    }

    getAll(): AngularFirestoreCollection<any> {
        return this.userRef
    }

    async getUserByUsername(username: string) {
        let data

        const snap = await this.firebase
            .collection('users')
            .ref.where('email', '==', username)
            .get()

        snap.forEach((doc) => {
            data = doc.data()
            console.log('data at login', data)
            AuthService.userWallet.username = data.username
            AuthService.userWallet.type = data.type
            AuthService.userDocument = data.id
        })

        return data
    }

    async getDocument(username: string) {
        const dat = await this.userRef.ref
            .where('username', '==', username)
            .get()

        AuthService.userDocument = dat.docs[0].id
    }

    register(user: UserCredentials): void {
        this.userRef.add({ ...user })
    }

    async getWalletByUsername(username: string) {
        let data

        const snap = await this.firebase
            .collection('wallet')
            .ref.where('username', '==', username)
            .get()

        if (snap.docs.length === 0) {
            this.createWallet()
        }

        snap.forEach((doc) => {
            data = doc.data()
            AuthService.userWallet.qrs = data.qrs
            AuthService.userWallet.amount = data.amount
        })
    }

    addMoney(amountData: number, codeqr: string): void {
        AuthService.userWallet.amount = amountData
        AuthService.userWallet.qrs.push(codeqr)
        this.firebase
            .collection('wallet')
            .doc(AuthService.userDocument)
            .update(AuthService.userWallet)
    }

    resetWallet() {
        this.firebase
            .collection('wallet')
            .doc(AuthService.userDocument)
            .update(AuthService.userWallet)
    }

    createWallet(): void {
        this.firebase
            .collection('wallet')
            .doc(AuthService.userDocument)
            .set(AuthService.userWallet)
    }

    async scanQR() {
        const qrData = await this.barcodeScanner.scan()

        return qrData.text
    }
}
