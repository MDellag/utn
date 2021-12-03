import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { ValidationsService } from 'src/app/services/validations.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    private password = ''
    private username = ''
    private isFetchingData = false

    constructor(
        private router: Router,
        private auth: AuthService,
        private notif: NotificationsService,
        private validator: ValidationsService
    ) {}

    async logInUser(): Promise<void> {
        if (!this.validator.validateFields(this.username, this.password)) {
            this.isFetchingData = true
            try {
                const data: Boolean = await this.auth.logInUser(
                    this.username,
                    this.password
                )

                if (data) {
                    this.isFetchingData = false
                    this.router.navigate(['home'])
                }
            } catch (err) {
                this.isFetchingData = false
                this.notif.notificationError('Credenciales Invalidas!')
            }
        }
        this.username = ''
        this.password = ''
    }

    insertarDatos(datos: string) {
        switch (datos) {
            case 'admin':
                this.username = 'admin@admin.com'
                this.password = '1111'
                break
            case 'guest':
                this.username = 'invitado@invitado.com'
                this.password = '2222'
                break
            case 'user':
                this.username = 'usuario@usuario.com'
                this.password = '3333'
                break
            case 'anonimo':
                this.username = 'anonimo@anonimo.com'
                this.password = '4444'
                break
            case 'tester':
                this.username = 'tester@tester.com'
                this.password = '5555'
                break
        }
    }

    ngOnInit() {}
}
