import { Injectable } from '@angular/core'
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database'
import { Observable } from 'rxjs'
import { Disponibilidad } from '../interfaces/disponibilidad'
import { Survey } from '../interfaces/survey'
import { Turno, TurnoStatus } from '../interfaces/turno'

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  private turnos!: Observable<Turno[]>
  private turnoRef: AngularFireList<Turno>

  constructor(private readonly db: AngularFireDatabase) {
    this.turnoRef = db.list('turnos')
    this.turnos = this.turnoRef.valueChanges()
  }

  addTurno(turno: Turno) {
    this.turnoRef.set(turno.id, turno)
  }

  findByIdPaciente(idPaciente: string) {
    return this.db
      .list('turnos', (ref) =>
        ref.orderByChild('id_paciente').startAt(idPaciente)
      )
      .valueChanges()
  }

  getAllTurns() {
    return this.db.list('turnos').valueChanges()
  }

  getAllTurnsByDni(dni: string) {
    return this.db
      .list('turnos', (ref) => ref.orderByChild('id_especialista').equalTo(dni))
      .valueChanges()
  }

  getAllTurnsByDniPaciente(dni: string) {
    return this.db
      .list('turnos', (ref) => ref.orderByChild('id_paciente').equalTo(dni))
      .valueChanges()
  }

  getAllTurnsByPatientAndSpecialist(dniPatient: string, dniSpecialist: string) {
    return this.db
      .list(
        'turnos',
        (ref) =>
          ref.orderByChild('id_especialista').equalTo(dniSpecialist) &&
          ref.orderByChild('id_paciente').equalTo(dniPatient) &&
          ref.orderByChild('status').equalTo('REALIZADO')
      )
      .valueChanges()
  }

  findByIdEspecialista(idEspecialista: string) {
    return this.db
      .list('turnos', (ref) =>
        ref.orderByChild('id_especialista').equalTo(idEspecialista)
      )
      .valueChanges()
  }

  updateStatus(id: string, status: TurnoStatus) {
    this.turnoRef.update(id, { status })
  }

  accept(id: string) {
    this.turnoRef.update(id, { accepted: true })
  }

  addComment(id: string, comment: string) {
    this.turnoRef.update(id, { cancel_comment: comment })
  }

  addResena(id: string, resena: string) {
    this.turnoRef.update(id, { resena })
  }

  addSurvey(survey: Survey) {
    this.db.list('surveys').set(survey.id, survey)
  }

  getSurveys() {
    return this.db
      .list('surveys', (ref) => ref.orderByChild('id'))
      .valueChanges()
  }

  addDisponibilidad(disp: Disponibilidad) {
    this.db.list('disp').set(disp.id, disp)
  }

  getDispsById(id: string) {
    return this.db
      .list('disp', (ref) => ref.orderByChild('id').equalTo(id))
      .valueChanges()
  }
}
