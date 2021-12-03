import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ETypePhoto, IPhoto, IUserPhotos } from 'src/app/interfaces/iphoto'
import { AuthService } from 'src/app/services/auth.service'
import { NotificationsService } from 'src/app/services/notifications.service'
import { PhotoService } from 'src/app/services/photo.service'
import { MenuTwoComponent } from '../menutwo/menu.component'

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    public static photosToUpload = []
    photos = []
    isFetchingData: boolean = false
    constructor(
        private readonly photo: PhotoService,
        private readonly router: Router,
        private readonly notif: NotificationsService,
        public dialog: MatDialog
    ) {}

    async fotoLinda() {
        const photodata = await this.photo.takePhoto()
        MenuComponent.photosToUpload.push(photodata)
        // this.isFetchingData = true
        // await this.photo.savePhoto(photodata.dataUrl, ETypePhoto.Lindo)
        // this.isFetchingData = false
        console.log(MenuComponent.photosToUpload)
        this.openDialog()
        this.notif.notificationSuccess('Foto Subida con exito!')
    }

    logOut() {
        this.router.navigate(['home'])
    }

    chart() {
        this.router.navigate(['piechart'])
    }

    myPhotos() {
        this.router.navigate(['myphotos'])
    }

    async openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog2)

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result === 'yes') {
                this.fotoLinda()
            } else {
                this.isFetchingData = true
                for (let e = 0; e < MenuComponent.photosToUpload.length; e++) {
                    await this.photo.savePhoto(
                        MenuComponent.photosToUpload[e].dataUrl,
                        ETypePhoto.Lindo
                    )
                }

                this.isFetchingData = false
            }
        })
    }

    like(foto: IPhoto) {
        if (!foto.pplLiked.find((e) => e === AuthService.user.name)) {
            foto.likes++
            foto.pplLiked.push(AuthService.user.name)
            this.photo.likePhoto(foto)
        } else {
            this.notif.notificationError('Ya le has dado me gusta a la foto!')
        }
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
                        usersPhotoData[i].photos[p].type === ETypePhoto.Lindo
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

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content2.html',
})
export class DialogContentExampleDialog2 {
    imagesToShow = []
    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<DialogContentExampleDialog2>
    ) {
        this.imagesToShow = MenuTwoComponent.photosToUpload
    }

    addPhoto(resp) {
        this.dialogRef.close(resp)
    }
}
