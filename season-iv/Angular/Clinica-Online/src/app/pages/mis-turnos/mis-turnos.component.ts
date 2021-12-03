import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { SurveyComponent } from 'src/app/components/survey/survey.component'
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica'
import { Survey } from 'src/app/interfaces/survey'
import { Turno, TurnoStatus } from 'src/app/interfaces/turno'
import { IUser, TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service'
import { NotificationService } from 'src/app/services/notification.service'
import { TurnosService } from 'src/app/services/turnos.service'

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  host: { style: 'width:100%' },
})
export class MisTurnosComponent implements OnInit {
  turnoList: any = []
  filter: string = ''
  fetching: boolean = false
  user!: IUser
  lista!: any

  constructor(
    private readonly turnos: TurnosService,
    private readonly auth: AuthService,
    private readonly dialog: MatDialog,
    private readonly notif: NotificationService,
    private readonly history: HistoriaClinicaService
  ) {}

  statusClass: any = {
    PENDIENTE: 'pending',
    RECHAZADO: 'rejected',
    CANCELADO: 'rejected',
    REALIZADO: 'done',
  }

  displayedColumns: string[] = [
    'id',
    'paciente',
    'especialista',
    'especialidad',
    'date',
    'status',
    'accepted',
    'options',
  ]

  onFilter() {
    this.fetching = !this.fetching
    const reg = new RegExp(this.filter.toLowerCase())
    const matched = this.lista.filter(
      (t: Turno) =>
        reg.test(t.especialidad.toLowerCase()) ||
        reg.test(t.id) ||
        reg.test(t.name_especialista.toLowerCase()) ||
        reg.test(t.name_paciente.toLowerCase()) ||
        reg.test(t.date.toString()) ||
        reg.test(t.status.toLowerCase()) ||
        reg.test(t.accepted ? 'si' : 'no')
    )

    this.turnoList = matched
    this.fetching = !this.fetching
  }

  cancel(turno: any) {
    const disp = this.displayDialog('Cancelacion', '', true)
    disp.subscribe((value: string) => {
      if (value && value.length > 10) {
        this.turnos.addComment(turno.id, value)
        this.turnos.updateStatus(turno.id, TurnoStatus.CANCELADO)
        this.notif.warn('Turno cancelado')
      } else if (value) {
        this.notif.error('El comentario debe ser mayor a 10 caracteres')
      }
    })
  }

  reject(turno: any) {
    const disp = this.displayDialog('Rechazo de turno', '', true)
    disp.subscribe((value: string) => {
      if (value && value.length > 10) {
        this.turnos.addComment(turno.id, value)
        this.turnos.updateStatus(turno.id, TurnoStatus.RECHAZADO)
        this.notif.warn('Turno rechazado')
      } else if (value) {
        this.notif.error('El comentario debe ser mayor a 10 caracteres')
      }
    })
  }

  extra: any = {
    dato_uno: '',
    dato_dos: '',
    dato_tres: '',
  }

  done(turno: any) {
    const disp = this.displayDialog('Reseña', '', true)
    disp.subscribe((value: any) => {
      this.turnos.addResena(turno.id, value.resena)
      this.turnos.updateStatus(turno.id, TurnoStatus.REALIZADO)

      const extra: any = this.destructureObject(value.extra)

      const data: HistoriaClinica = {
        ...value.datos,
        id: Date.now().toString(),
        id_paciente: turno.id_paciente,
        id_especialista: this.user.dni,
        extra,
      }

      this.history.addData(data)
      this.notif.success('Datos cargado con exito!')
    })
  }

  accept(turno: any) {
    this.turnos.accept(turno.id)
    this.notif.success('Turno aceptado!')
  }

  view(turno: any) {
    const message = {
      comment: turno.cancel_comment,
      resena: turno.resena,
    }
    this.displayDialog('', message, false)
  }

  survey(turno: any) {
    const disp = this.displaySurvey()
    disp.subscribe((value: any) => {
      if (value.trato && value.disponibilidad && value.conocimiento) {
        const survey: Survey = {
          id: Date.now().toString(),
          idEspecialista: turno.id_especialista,
          ...value,
        }

        this.turnos.addSurvey(survey)
        this.notif.success('Se ha enviado la encuesta!')
      }
    })
  }

  qualify(turno: any) {
    const disp = this.displayDialog('Comentario', '', true)
    disp.subscribe((value: string) => {
      if (value && value.length > 10) {
        this.turnos.addComment(turno.id, value)
        this.notif.success('Comentario cargado con exito!')
      } else {
        this.notif.error('El comentario debe ser mayor a 10 caracteres')
      }
    })
  }

  destructureObject(obj: any) {
    const data: any = {}

    for (let value of Object.values<string>(obj)) {
      const splitted = value.split(':')
      if (splitted[0] && splitted[1]) {
        data[splitted[0]] = splitted[1]
      }
    }

    return data
  }

  displayDialog(header: string, message: any, input: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        header,
        message,
        input,
        buttons: true,
      },
    })

    return dialogRef.afterClosed()
  }

  displaySurvey() {
    const dialogRef = this.dialog.open(SurveyComponent)
    return dialogRef.afterClosed()
  }

  getTurnos(user: IUser) {
    if (this.user.type === TypeUser.PATIENT) {
      this.turnos.findByIdPaciente(this.user.dni).subscribe((value) => {
        this.turnoList = value
        this.lista = value
        if (this.fetching) this.fetching = !this.fetching
      })
    } else if (this.user.type === TypeUser.SPECIALIST) {
      this.turnos.findByIdEspecialista(this.user.dni).subscribe((values) => {
        this.turnoList = values
        this.lista = values
        if (this.fetching) this.fetching = !this.fetching
      })
    }
  }

  async ngOnInit(): Promise<void> {
    this.fetching = !this.fetching
    this.user = await this.auth.getCredentials()
    this.getTurnos(this.user)
  }
}
