import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IPhoto } from 'src/app/interfaces/iphoto'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { PhotoService } from 'src/app/services/photo.service'

@Component({
    selector: 'app-myphotos',
    templateUrl: './myphotos.component.html',
    styleUrls: ['./myphotos.component.scss'],
})
export class MyphotosComponent implements OnInit {
    photos = []
    isFetchingData = false
    constructor(
        private auth: AuthService,
        private notifications: NotificationsService,
        private router: Router,
        private photo: PhotoService
    ) {}

    back() {
        this.router.navigate(['home'])
    }

    ngOnInit() {
        this.photo.getAllPhotosObservable().subscribe((usersPhotoData) => {
            this.photos = []
            for (let i = 0; i < usersPhotoData.length; i++) {
                for (let p = 0; p < usersPhotoData[i].photos.length; p++) {
                    if (
                        !this.photos.find(
                            (pho) =>
                                pho.photo ===
                                    usersPhotoData[i].photos[p].photo &&
                                pho.author === usersPhotoData[i].name
                        ) &&
                        usersPhotoData[i].photos[p].author ===
                            AuthService.user.name
                    ) {
                        const data: IPhoto = {
                            author: usersPhotoData[i].name,
                            photo: usersPhotoData[i].photos[p].photo,
                            date: new Date(usersPhotoData[i].photos[p].date),
                            likes: usersPhotoData[i].photos[p].likes,
                            pplLiked: usersPhotoData[i].photos[p].pplLiked,
                            id: usersPhotoData[i].photos[p].id,
                            type: usersPhotoData[i].photos[p].type,
                        }
                        this.photos.push(data)
                    }
                }
            }
            this.photos = this.photos.sort((a, b) => {
                return b.date - a.date
            })

            console.log(this.photos)
        })
    }
}
