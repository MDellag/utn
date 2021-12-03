import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { PhotosService } from 'src/app/services/photos.service'

@Component({
    selector: 'app-altas',
    templateUrl: './altas.component.html',
    styleUrls: ['./altas.component.scss'],
})
export class AltasComponent implements OnInit {
    email = ''
    password = ''
    passwordConfirm = ''
    apellido = ''
    nombre = ''
    dni = ''
    foto = ''
    public sarasa: boolean = false
    public static phot = ''
    constructor(
        private router: Router,
        private auth: AuthService,
        private photo: PhotosService,
        private notif: NotificationsService
    ) {}

    logOut() {
        this.router.navigate(['home'])
    }

    async takePhoto() {
        const photo: any = await this.photo.takePhoto()
        this.foto = photo.dataUrl
    }

    async registrar() {
        const data = {
            email: this.email,
            password: this.password,
            apellido: this.apellido,
            nombre: this.nombre,
            dni: this.dni,
            foto: this.foto,
        }
        try {
            this.validate()
            this.sarasa = true
            await this.photo.savePhoto(this.foto)
            await this.auth.createUser(data)
            this.sarasa = false
            this.emptyInputs()
        } catch (e) {
            this.notif.notificationError(e)
        }
    }

    async scanQr() {
        const qr = await this.photo.scanDni()
        const userQR = qr.split('@')

        this.apellido = userQR[1].toLocaleLowerCase()
        this.nombre = userQR[2].toLocaleLowerCase()
        this.dni = userQR[4]
    }

    validate() {
        if (!this.email) throw 'Debe Ingresar un Email!'
        if (!this.password) throw 'Debe Ingresar una Contraseña!'
        if (!this.passwordConfirm) throw 'Debe Re-Ingresar la Contraseña!'
        if (this.passwordConfirm !== this.password)
            throw 'Las Contraseñas deben coincidir!'
        if (!this.apellido) throw 'Debe Ingresar un Apellido!'
        if (!this.nombre) throw 'Debe Ingresar un Nombre!'
        if (!this.dni) throw 'Debe Ingresar un DNI!'
        if (!this.foto) throw 'Debe tomarse una Foto!'
    }

    emptyInputs() {
        this.apellido = ''
        this.nombre = ''
        this.password = ''
        this.email = ''
        this.passwordConfirm = ''
        this.foto = ''
        this.dni = ''
    }
    ngOnInit() {}
}
