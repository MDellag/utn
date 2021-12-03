import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'
import { ERRORS } from 'src/app/utils/errors'
import { validateRegister } from 'src/app/utils/validations'
import { SPECIALITIES } from 'src/app/utils/especialidades'
import { NgForm } from '@angular/forms'
import { OBRAS_SOCIALES } from 'src/app/utils/obrasSociales'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: { style: 'width: 100%;' },
})
export class RegisterComponent implements OnInit {
  fetching: boolean = false
  specs: string[] = []
  obrasSociales: string[] = []
  token: string | undefined = undefined
  typeUserRegistration: string = ''
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

  constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router
  ) {}

  async register() {
    try {
      validateRegister(this.user_data)
      if (!this.token) throw 'UNRESOLVED_CAPTCHA'
      this.fetching = !this.fetching
      const photos = []

      if (this.user_data.photo.name) {
        const photo = await this.authService.savePhoto(this.user_data.photo)
        photos.push(photo)
      } else {
        for (const photo of this.user_data.photo) {
          const phot = await this.authService.savePhoto(photo)
          photos.push(phot)
        }
      }

      await this.authService.register({
        dni: this.user_data.dni.toString(),
        email: this.user_data.email,
        name: this.user_data.name,
        lastname: this.user_data.lastname,
        password: this.user_data.password,
        type:
          this.user_data.typeUser === 'PATIENT'
            ? TypeUser.PATIENT
            : TypeUser.SPECIALIST,
        photo: photos,
        especialidad:
          this.user_data.typeUser === 'SPECIALIST'
            ? this.user_data.especialidad
            : [],
        obraSocial:
          this.user_data.typeUser === 'PATIENT'
            ? this.user_data.obraSocial
            : '',
        approved: this.user_data.typeUser === 'PATIENT' ? true : false,
      })

      this.notification.success('Register successful!', 4000)

      this.fetching = !this.fetching
      if (this.user_data.typeUser === TypeUser.SPECIALIST) {
        this.router.navigate(['mis-turnos'])
      } else {
        this.router.navigate(['solicitar-turno'])
      }
    } catch (err) {
      if (this.fetching) this.fetching = !this.fetching
      this.resetFields()
      this.notification.error(ERRORS[err as string], 4000)
    }
  }

  assignTypeUserReg(type: string) {
    this.typeUserRegistration = type

    this.user_data.typeUser =
      type === 'specialist' ? TypeUser.SPECIALIST : TypeUser.PATIENT
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

  ngOnInit(): void {
    this.specs = SPECIALITIES
    this.obrasSociales = OBRAS_SOCIALES
  }
}
