import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { HistoriaClinica } from '../interfaces/historiaClinica'

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private readonly db: AngularFireDatabase) {}

  addLog(login: any) {
    this.db.list('logs').push(login)
  }

  getLogs() {
    return this.db.list('logs').valueChanges()
  }
}
