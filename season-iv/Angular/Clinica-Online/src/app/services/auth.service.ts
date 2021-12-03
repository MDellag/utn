import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Subject } from 'rxjs'
import { IUser, TypeUser, UserCredentials } from '../interfaces/users'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { LogsService } from './logs.service'
// import { NotificationsService } from './notifications.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subjectLoggedIn: Subject<boolean> = new Subject<boolean>()

  private usersRef: AngularFirestoreCollection<IUser>
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly storage: AngularFireStorage,
    private readonly fireAuth: AngularFireAuth,
    private readonly logs: LogsService
  ) {
    this.usersRef = this.firestore.collection('users')
  }

  async logIn(credentials: UserCredentials) {
    try {
      const ref = await this.usersRef.ref
        .where('email', '==', credentials.email)
        .where('password', '==', credentials.password)
        .get()

      if (!ref.docs[0]) {
        throw 'WRONG_EMAIL_PASSWORD'
      }

      const user = ref.docs[0].data()

      if (user?.approved) {
        const validated = await this.fireAuth.signInWithEmailAndPassword(
          credentials.email,
          credentials.password
        )
        if (!validated.user?.emailVerified && user?.type !== 'ADMIN') {
          await validated.user?.sendEmailVerification()
          throw 'NOT_VALIDATED_ACCOUNT'
        }
        this.logs.addLog({
          date: Date.now(),
          email: credentials.email,
        })

        this.saveCredentials(user)
        this.subjectLoggedIn.next(true)
      } else {
        throw 'USER_DISABLED'
      }
    } catch (err) {
      console.error('LogInService', err)

      throw err
    }
  }

  async register(user: IUser) {
    const userFoundByDni = await this.getUserByDni(user.dni)

    if (!userFoundByDni) {
      try {
        const us = await this.fireAuth.createUserWithEmailAndPassword(
          user.email,
          user.password
        )
        await us.user?.sendEmailVerification()
      } catch (err) {
        throw 'EMAIL_ALREADY_TAKEN'
      }

      await this.usersRef.doc(user.dni).set(user)
      this.saveCredentials(user)
    } else {
      throw 'EMAIL_OR_DNI_ALREADY_TAKEN'
    }
  }

  logOut() {
    this.subjectLoggedIn.next(false)
    this.dropCredentials()
  }

  isLoggedIn(): boolean {
    const credentials = this.getUserCred()
    return credentials ? true : false
  }

  saveCredentials(userData: IUser): void {
    localStorage.setItem('user_data', JSON.stringify(userData))
  }

  dropCredentials(): void {
    localStorage.removeItem('user_data')
  }

  getCredentials(): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      const data = localStorage.getItem('user_data')!
      try {
        const user = <IUser>JSON.parse(data)
        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  }

  getUserCred(): IUser | undefined {
    const data = localStorage.getItem('user_data')!
    try {
      return <IUser>JSON.parse(data)
    } catch (err) {
      console.log(err)
      return
    }
  }

  async getAllUsers() {
    const users = await this.usersRef.get().toPromise()
    return users.docs.map((doc) => doc.data())
  }

  async getAllSpecialists() {
    const specialists = await this.usersRef.ref
      .where('type', '==', 'SPECIALIST')
      .where('approved', '==', true)
      .get()
    return specialists.docs.map((doc) => doc.data())
  }

  async getUserByName(name: string, lastname: string, type: TypeUser) {
    const specialists = await this.usersRef.ref
      .where('name', '>=', name)
      .where('name', '<=', name)
      .where('lastname', '>=', lastname)
      .where('lastname', '<=', lastname)
      .where('type', '==', type)
      .where('approved', '==', true)
      .get()
    return specialists.docs.map((doc) => doc.data())
  }

  async getAllPatients() {
    const patients = await this.usersRef.ref
      .where('type', '==', 'PATIENT')
      .get()
    return patients.docs.map((doc) => doc.data())
  }

  async getUserByDni(dni: string): Promise<IUser | undefined> {
    const userFound = await this.usersRef.ref.where('dni', '==', dni).get()
    return <IUser>userFound.docs[0]?.data()
  }
  async getUserByEmail(email: string): Promise<IUser | undefined> {
    const userFound = await this.usersRef.ref.where('email', '==', email).get()
    return <IUser>userFound.docs[0]?.data()
  }

  async enableDisableUser(dni: string) {
    const user = (await this.usersRef.doc(dni).ref.get()).data()
    if (user) {
      user.approved = !user.approved
      await this.usersRef.doc(dni).set(user)
    }
  }

  async savePhoto(photo: any): Promise<string> {
    const path = `fotos/${Date.now()}.jpeg`

    return (await this.storage.upload(path, photo)).ref.getDownloadURL()
  }
}
