import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TypeUser } from 'src/app/interfaces/users'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'
import { ERRORS } from 'src/app/utils/errors'
import { validateRegister } from 'src/app/utils/validations'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string = ''
  email: string = ''
  password: string = ''
  passwordConfirm: string = ''
  fetching: boolean = false

  constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router
  ) {}

  async register() {
    try {
      validateRegister({
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        name: this.name,
      })
      this.fetching = !this.fetching
      await this.authService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        type: TypeUser.User,
      })

      await this.authService.logIn({
        email: this.email,
        password: this.password,
      })
      this.notification.success('Register successful!', 4000)

      this.fetching = !this.fetching
      this.router.navigate(['home'])
    } catch (err) {
      this.notification.error(ERRORS[err as string], 4000)
      this.fetching = !this.fetching
    }
  }

  ngOnInit(): void {}
}
