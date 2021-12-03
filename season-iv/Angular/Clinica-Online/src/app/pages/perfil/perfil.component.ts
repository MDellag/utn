import { Component, OnInit } from '@angular/core'
import { IUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import * as moment from 'moment'
import { MatDialog } from '@angular/material/dialog'
import { DialogDisponibilidadComponent } from 'src/app/components/dialog-disponibilidad/dialog-disponibilidad.component'
import { TurnosService } from 'src/app/services/turnos.service'
import { Disponibilidad } from 'src/app/interfaces/disponibilidad'
import { NotificationService } from 'src/app/services/notification.service'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  host: {
    style: 'width:100%; display: flex; justify-content: space-around',
    class: 'background',
  },
})
export class PerfilComponent implements OnInit {
  user!: IUser
  disponibilidad!: Disponibilidad
  photo: string = ''
  photoSubject: Subject<string> = new Subject<string>()

  constructor(
    private readonly auth: AuthService,
    private readonly dialog: MatDialog,
    private readonly turn: TurnosService,
    private readonly notif: NotificationService
  ) {}

  changeDisponibility() {
    const time = this.displayDisponibilidad()

    time.subscribe((value: any) => {
      if (value) {
        const data: Disponibilidad = {
          id: this.user.dni,
          from: value.from,
          to: value.to,
        }

        this.turn.addDisponibilidad(data)
        this.notif.success('Disponibilidad cambiada!')
      }
    })
  }

  displayDisponibilidad() {
    const dialogRef = this.dialog.open(DialogDisponibilidadComponent)
    return dialogRef.afterClosed()
  }

  changePhoto() {
    this.photo =
      this.photo === this.user.photo[0]
        ? this.user.photo[1]
        : this.user.photo[0]

    this.photoSubject.next(this.photo)
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getCredentials()
    this.photo = this.user.photo[0]
    this.photoSubject.next(this.photo)
    this.turn.getDispsById(this.user.dni).subscribe((disp: any) => {
      if (!disp.length) {
        const data: Disponibilidad = {
          id: this.user.dni,
          from: '09:00h',
          to: '18:00h',
        }
        this.turn.addDisponibilidad(data)
      }
      this.disponibilidad = disp[0]
    })
  }
}
