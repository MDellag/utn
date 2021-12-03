import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { IUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'

export interface DialogData {
  header: string
  message?: any
  type?: 'success' | 'error' | 'warning'
  input: boolean
  buttons?: boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  user!: IUser

  header!: string
  message!: any
  type!: string
  input!: boolean
  buttons!: boolean
  inputMessage!: string

  extraData: any = {
    altura: '',
    peso: '',
    temperatura: '',
    presion: '',
  }

  extra: any = {
    dato_uno: '',
    dato_dos: '',
    dato_tres: '',
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private readonly dialogRef: MatDialogRef<DialogComponent>,
    private readonly notif: NotificationService,
    private readonly auth: AuthService
  ) {
    this.header = data.header
    this.message = data.message
    this.type = data.type || 'none'
    this.input = data.input
    this.buttons = data.buttons || false
  }

  closeDialog(resp: string) {
    this.dialogRef.close(resp)
  }

  closeDialogMessage() {
    if (this.inputMessage.length < 15) {
      this.notif.error('La reseña debe ser mayor a 15 caracteres')
      return
    }

    if (
      this.user.type === 'SPECIALIST' &&
      this.header === 'Reseña' &&
      (!this.extraData.altura ||
        !this.extraData.peso ||
        !this.extraData.temperatura ||
        !this.extraData.presion ||
        !this.inputMessage)
    ) {
      this.notif.error(
        'Debe ingresar la Altura, Peso, Temperatura y Presion. Ademas de la Reseña',
        5000
      )
    } else if (this.user.type === 'SPECIALIST' && this.header === 'Reseña') {
      const response = {
        resena: this.inputMessage,
        datos: this.extraData,
        extra: this.extra,
      }
      this.dialogRef.close(response)
    } else {
      this.dialogRef.close(this.inputMessage)
    }
  }

  close() {
    this.dialogRef.close()
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getCredentials()
  }
}
