import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import * as moment from 'moment'
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-dialog-disponibilidad',
  templateUrl: './dialog-disponibilidad.component.html',
  styleUrls: ['./dialog-disponibilidad.component.scss'],
})
export class DialogDisponibilidadComponent implements OnInit {
  from!: any
  to!: any
  times: any = []

  constructor(
    private readonly dialogRef: MatDialogRef<DialogDisponibilidadComponent>,
    private readonly notif: NotificationService
  ) {}

  closeDialogMessage() {
    const time: any = { from: this.from, to: this.to }
    if (this.to > this.from) {
      this.dialogRef.close(time)
    } else if (this.to && this.from) {
      this.notif.error(
        'La disponibilidad horaria es invalidad o posee inconsistencias'
      )
    } else {
      this.dialogRef.close()
      this.notif.warn('No ha indicado su disponibilidad')
    }
  }

  generateHours() {
    const start = 0
    const end = 24

    for (let hour = start; hour < end; hour++) {
      this.times.push(moment({ hour }).format('HH:mm').concat('h'))
      this.times.push(
        moment({
          hour,
          minute: 30,
        })
          .format('HH:mm')
          .concat('h')
      )
    }
  }

  ngOnInit(): void {
    this.generateHours()
  }
}
