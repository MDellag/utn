import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Credentials, Repartidor, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersRef: AngularFirestoreCollection<User>;
  private repRef: AngularFirestoreCollection<Repartidor>;

  constructor(private readonly firestore: AngularFirestore) {
    this.usersRef = this.firestore.collection('users');
    this.repRef = this.firestore.collection('repartidores');
  }

  async login(credentials: Credentials): Promise<User> {
    const user = (
      await this.usersRef.ref
        .where('email', '==', credentials.email)
        .where('password', '==', credentials.password)
        .get()
    ).docs[0]?.data();

    if (user != undefined) {
      localStorage.setItem('credencial', JSON.stringify(user));
    }
    return user;
  }

  async addRepartidor(rep: Repartidor) {
    await this.repRef.doc(rep.dni.toString()).set(rep);
  }

  getCredentials(): User | undefined {
    const data = localStorage.getItem('credencial')!;
    try {
      return <User>JSON.parse(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async getRepartidores(): Promise<Repartidor[]> {
    const data = await this.repRef.ref.get();
    const repartidores: Repartidor[] = data.docs.map((rep) => rep.data());
    return repartidores;
  }

  async getRepartidorByDni(dni: number): Promise<Repartidor> {
    const data = await this.repRef.ref.where('dni', '==', dni).get();
    const rep: Repartidor = data.docs[0].data();
    return rep;
  }

  logout() {
    localStorage.removeItem('credencial');
  }
}
