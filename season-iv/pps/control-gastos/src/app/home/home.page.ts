import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ETypePhoto } from '../interfaces/iphoto'
import { AuthService } from '../services/auth.service'
import { NotificationsService } from '../services/notifications.service'
import { PhotoService } from '../services/photo.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    spinner: boolean = false

    salario
    alimentos
    medicina
    servicios
    impuestos
    constructor(
        private auth: AuthService,
        private photo: PhotoService,
        private router: Router,
        private notif: NotificationsService
    ) {}

    async cargarGastos() {
        if (
            !this.salario ||
            !this.alimentos ||
            !this.medicina ||
            !this.servicios ||
            !this.impuestos
        ) {
            this.notif.notificationError('complete todos los campos')
        }

        const data = {
            salario: this.salario,
            alimentos: this.alimentos,
            medicina: this.medicina,
            servicios: this.servicios,
            impuestos: this.impuestos,
        }
        this.auth.saveGastos(data)
        this.notif.notificationSuccess('Datos Cargados con Exito!')
        this.clearFields()
    }

    piechart() {
        this.router.navigate(['piechart'])
    }
    barchart() {
        this.router.navigate(['barchart'])
    }

    clearFields() {
        this.alimentos = ''
        this.salario = ''
        this.medicina = ''
        this.impuestos = ''
        this.servicios = ''
    }

    logOut() {
        this.auth.logOut()
        this.router.navigate(['login'])
    }

    ngOnInit() {}
}
