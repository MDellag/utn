import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  message: any
  disponibilidad: any
  trato: any
  conocimiento: any

  autoTicks = false
  max = 10
  min = 1
  showTicks = true
  thumbLabel = true
  tickInterval = 1

  constructor(
    private readonly dialogRef: MatDialogRef<SurveyComponent>,
    private readonly notif: NotificationService
  ) {}

  closeDialog(resp: string) {
    this.dialogRef.close(resp)
  }

  closeDialogMessage() {
    if (this.disponibilidad && this.trato && this.conocimiento) {
      this.dialogRef.close({
        conocimiento: this.conocimiento,
        trato: this.trato,
        disponibilidad: this.disponibilidad,
      })
    } else {
      this.notif.error('Debe indicar almenos un valor para cada seccion!')
    }
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval
    }

    return 0
  }

  ngOnInit(): void {}
}
