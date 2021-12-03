import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { HistoriaClinica } from '../interfaces/historiaClinica'

@Injectable({
  providedIn: 'root',
})
export class HistoriaClinicaService {
  constructor(private readonly db: AngularFireDatabase) {}

  addData(history: HistoriaClinica) {
    this.db.list('historia_clinica').set(history.id, history)
  }

  findByDni(dni: string) {
    return this.db
      .list('historia_clinica', (ref) =>
        ref.orderByChild('id_paciente').equalTo(dni)
      )
      .valueChanges()
  }
}
