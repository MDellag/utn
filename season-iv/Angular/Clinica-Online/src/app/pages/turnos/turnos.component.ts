import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { Turno, TurnoStatus } from 'src/app/interfaces/turno'
import { IUser, TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'
import { TurnosService } from 'src/app/services/turnos.service'

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
  host: { style: 'width:100%' },
})
export class TurnosComponent implements OnInit {
  turnoList: any = []
  filter: string = ''
  filterEspecialidad: string = ''
  fetching: boolean = false
  user!: IUser

  lista!: any

  constructor(
    private readonly turnos: TurnosService,
    private readonly auth: AuthService,
    private readonly dialog: MatDialog,
    private readonly notif: NotificationService
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

  getTurnos(user: IUser) {
    this.turnos.getAllTurns().subscribe((value: any) => {
      this.turnoList = value
      this.lista = value
      this.fetching = !this.fetching
    })
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

  async ngOnInit(): Promise<void> {
    this.fetching = !this.fetching
    this.user = await this.auth.getCredentials()
    this.getTurnos(this.user)
  }
}
