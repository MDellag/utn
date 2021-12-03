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
    constructor(
        private auth: AuthService,
        private photo: PhotoService,
        private router: Router,
        private notif: NotificationsService
    ) {}

    myPhotos() {
        this.router.navigate(['myphotos'])
    }

    async fotoLinda() {
        this.router.navigate(['menu'])
    }

    async fotoFea() {
        this.router.navigate(['menutwo'])
    }

    logOut() {
        this.auth.logOut()
        this.router.navigate(['login'])
    }

    ngOnInit() {}
}
