import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore'
import { Subject } from 'rxjs'
import { IUser, UserCredentials } from '../interfaces/users'
// import { NotificationsService } from './notifications.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subjectLoggedIn: Subject<boolean> = new Subject<boolean>()
  public static user: IUser = {
    id: '',
    email: '',
    password: '',
    name: '',
    type: '',
  }

  private usersRef: AngularFirestoreCollection<IUser>
  constructor(private readonly firestore: AngularFirestore) {
    this.usersRef = this.firestore.collection('users')
  }

  async logIn(credentials: UserCredentials) {
    try {
      const user = await this.usersRef.ref
        .where('email', '==', credentials.email)
        .where('password', '==', credentials.password)
        .get()

      AuthService.user = user.docs[0].data()
      localStorage.setItem('userCredentials', JSON.stringify(AuthService.user))
      this.subjectLoggedIn.next(true)
    } catch (err) {
      console.error('LogInService', err)
      throw 'ERROR_LOGIN'
    }
  }

  async register(user: IUser) {
    const userExists = await this.usersRef.ref
      .where('email', '==', user.email)
      .get()

    if (!userExists.docs[0]?.data()) {
      user.id = Date.now().toString()
      this.usersRef.doc(user.id).set(user)
    } else {
      throw 'EMAIL_ALREADY_TAKEN'
    }
  }

  logOut() {
    this.subjectLoggedIn.next(false)
    localStorage.removeItem('userCredentials')
    AuthService.user = {
      id: '',
      email: '',
      password: '',
      name: '',
      type: '',
    }
  }
}
