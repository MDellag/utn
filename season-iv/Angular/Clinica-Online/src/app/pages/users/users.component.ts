import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { DialogHistoryComponent } from 'src/app/components/dialog-history/dialog-history.component'
import { IUser, TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { ExportService } from 'src/app/services/export.service'
import { NotificationService } from 'src/app/services/notification.service'
import { TurnosService } from 'src/app/services/turnos.service'
import { ERRORS } from 'src/app/utils/errors'
import { SPECIALITIES } from 'src/app/utils/especialidades'
import { OBRAS_SOCIALES } from 'src/app/utils/obrasSociales'
import { validateRegister } from 'src/app/utils/validations'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  host: { style: 'width:100%' },
})
export class UsersComponent implements OnInit {
  fetching: boolean = false
  userList: IUser[] = []
  specs: string[] = []
  obrasSociales: string[] = []
  displayedColumns: string[] = [
    'dni',
    'email',
    'name',
    'lastname',
    'type',
    'especialidad',
    'obraSocial',
    'photo',
    'approved',
    'options',
  ]

  user_data: any = {
    email: '',
    dni: '',
    name: '',
    lastname: '',
    password: '',
    passwordConfirm: '',
    typeUser: '',
    especialidad: [],
    other: '',
    obraSocial: undefined,
    photo: [],
  }

  typeUsers = {
    SPECIALIST: 'Especialista',
    PATIENT: 'Paciente',
    ADMIN: 'Administrador',
  }

  constructor(
    private readonly users: AuthService,
    private readonly notification: NotificationService,
    private readonly dialog: MatDialog,
    private readonly exportServ: ExportService,
    private readonly turnS: TurnosService,
    private readonly exportS: ExportService
  ) {}

  saveCsv() {
    const users_csv = []

    for (const obj of this.userList) {
      users_csv.push({
        dni: obj.dni,
        email: obj.email,
        nombre: obj.name,
        apellido: obj.lastname,
        tipo: obj.type,
        especialidad: obj.especialidad?.join('-'),
        obra_social: obj.obraSocial,
        aprobado: obj.approved ? 'Si' : 'No',
      })
    }

    this.exportServ.downloadFile(users_csv, 'clinica-usuarios')
  }

  async enableDisable(dni: string) {
    this.fetching = !this.fetching
    await this.users.enableDisableUser(dni)
    await this.refresh()
    this.fetching = !this.fetching
  }

  downloadUserTurns(user: IUser) {
    if (user.type === TypeUser.SPECIALIST) {
      this.turnS.getAllTurnsByDni(user.dni).subscribe((turn) => {
        if (turn.length > 0) {
          this.exportS.downloadFile(
            turn,
            `turnos-${user.name}-${user.lastname}`
          )
        } else {
          this.notification.error('Este usuario no posee turnos para descargar')
        }
      })
    } else if (user.type === TypeUser.PATIENT) {
      this.turnS.getAllTurnsByDniPaciente(user.dni).subscribe((turn) => {
        if (turn.length > 0) {
          this.exportS.downloadFile(
            turn,
            `turnos-${user.name}-${user.lastname}`
          )
        } else {
          this.notification.error('Este usuario no posee turnos para descargar')
        }
      })
    } else {
      this.notification.error('El ADMINISTRADOR no posee turnos para descargar')
    }
  }

  async refresh() {
    this.userList = await this.users.getAllUsers()
  }

  displayDialog(dni: string) {
    this.dialog.open(DialogHistoryComponent, { data: dni })
  }

  async ngOnInit() {
    this.specs = SPECIALITIES
    this.obrasSociales = OBRAS_SOCIALES
    this.fetching = !this.fetching
    await this.refresh()
    this.fetching = !this.fetching
  }

  async addUser() {
    try {
      validateRegister(this.user_data)

      this.fetching = !this.fetching
      const photos = []

      if (this.user_data.photo.name) {
        const photo = await this.users.savePhoto(this.user_data.photo)
        photos.push(photo)
      } else {
        for (const photo of this.user_data.photo) {
          const phot = await this.users.savePhoto(photo)
          photos.push(phot)
        }
      }

      await this.users.register({
        dni: this.user_data.dni.toString(),
        email: this.user_data.email,
        name: this.user_data.name,
        lastname: this.user_data.lastname,
        password: this.user_data.password,
        type: this.user_data.typeUser,
        photo: photos,
        especialidad:
          this.user_data.typeUser === 'SPECIALIST'
            ? this.user_data.especialidad
            : [],
        obraSocial:
          this.user_data.typeUser === 'PATIENT'
            ? this.user_data.obraSocial
            : '',
        approved: this.user_data.typeUser === 'SPECIALIST' ? false : true,
      })

      await this.refresh()
      this.resetFields()
      this.notification.success('Usuario agregado!', 4000)
      this.fetching = !this.fetching
    } catch (err) {
      if (this.fetching) this.fetching = !this.fetching
      this.notification.error(ERRORS[err as string], 4000)
    }
  }

  resetFields() {
    this.user_data = {
      email: '',
      dni: '',
      name: '',
      lastname: '',
      password: '',
      passwordConfirm: '',
      typeUser: '',
      especialidad: [],
      other: '',
      obraSocial: undefined,
      photo: [],
    }
  }
}
