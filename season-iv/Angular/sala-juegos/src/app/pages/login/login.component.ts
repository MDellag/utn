import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationService } from 'src/app/services/notification.service'
import { ERRORS } from 'src/app/utils/errors'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
      this.notification.success('Werlcome: ' + AuthService.user.name, 4000)
      this.fetching = !this.fetching
      this.router.navigate(['home'])
    } catch (err) {
      this.fetching = !this.fetching
      this.notification.error(ERRORS[err as string], 4000)
    }
  }

  ngOnInit(): void {}
}
