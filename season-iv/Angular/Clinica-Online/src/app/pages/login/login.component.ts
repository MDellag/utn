import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'
import { ERRORS } from 'src/app/utils/errors'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: { style: 'width: 100%;' },
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  fetching: boolean = false

  constructor(
    private readonly auth: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router
  ) {}

  async login(): Promise<void> {
    try {
      this.fetching = !this.fetching

      await this.auth.logIn({ email: this.email, password: this.password })

      this.notification.success('Werlcome: ' + this.email, 4000)
      const usr = await this.auth.getCredentials()
      this.fetching = !this.fetching
      if (usr.type === TypeUser.SPECIALIST) {
        this.router.navigate(['mis-turnos'])
      } else {
        this.router.navigate(['solicitar-turno'])
      }
    } catch (err) {
      this.fetching = !this.fetching
      this.notification.error(ERRORS[err as string], 4000)
    }
  }

  fileChange(event: any) {
    console.log(event.target.files)
  }

  fillInputs(name: string) {
    const usr = this.userList.filter((p: any) => p.name === name)

    this.email = usr[0].email
    this.password = usr[0].name === 'Paciente 3' ? '123123' : '112233'
  }

  ngOnInit(): void {}

  userList: any = [
    {
      name: 'Admin',
      email: 'admin@clinica.com',
      password: '112233',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/clinicaonline-6f782.appspot.com/o/fotos%2Fadmin.jpg?alt=media&token=2d1a2a5a-fda5-469e-bcb8-a02873c7f8e8',
    },
    {
      name: 'Especialista 1',
      email: 'mauricio.dellagio@gmail.com',
      password: '112233',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/clinicaonline-6f782.appspot.com/o/fotos%2F1638145645964.jpeg?alt=media&token=2d1a2a5a-fda5-469e-bcb8-a02873c7f8e8',
    },
    {
      name: 'Especialista 2',
      email: 'mauro.hfd@gmail.com',
      password: '112233',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/clinicaonline-6f782.appspot.com/o/fotos%2F1638145901457.jpeg?alt=media&token=1274143d-1bb6-4f9d-9cbc-179f1d9b0cd0',
    },
    {
      name: 'Paciente 1',
      email: 'm.dellag@outlook.com',
      password: '112233',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/clinicaonline-6f782.appspot.com/o/fotos%2F1638146159961.jpeg?alt=media&token=78c2114f-8e5d-48f9-b42e-85dc658df750',
    },
    {
      name: 'Paciente 2',
      email: 'slek.giov@gmail.com',
      password: '112233',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/clinicaonline-6f782.appspot.com/o/fotos%2F1638146781815.jpeg?alt=media&token=b6c87f91-e23d-488c-96b8-2818f21ecd96',
    },
    {
      name: 'Paciente 3',
      email: 'cerra.gise@gmail.com',
      password: '112233',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/clinicaonline-6f782.appspot.com/o/fotos%2F1638146673126.jpeg?alt=media&token=4318df16-84f9-40c5-a583-f1558e71f58c',
    },
  ]
}
