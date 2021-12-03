import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
    ImageOptions,
} from '@capacitor/camera'
import { ETypePhoto, IPhoto, IUserPhotos } from '../interfaces/iphoto'
import { IUser } from '../interfaces/iuser'
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root',
})
export class PhotoService {
    public static photoData: IUserPhotos = {
        id: '',
        name: '',
        photos: [],
    }

    constructor(
        private storage: AngularFireStorage,
        private firebase: AngularFirestore
    ) {}

    public async takePhoto(): Promise<Photo> {
        // Take a photo
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 50,
        })
        return capturedPhoto
    }

    public async savePhoto(profilePic: string, typePhoto: ETypePhoto) {
        const path = `fotos/${Date.now()}.jpeg`
        const pictures = await this.storage.ref(path)

        await pictures
            .putString(profilePic, 'data_url', { contentType: 'image/jpeg' })
            .then(() => {
                console.log('IMG SUBIDA')
            })

        await this.storage
            .ref(path)
            .getDownloadURL()
            .toPromise()
            .then((url) => {
                const iphoto: IPhoto = {
                    likes: 0,
                    photo: url,
                    author: AuthService.user.name,
                    pplLiked: [],
                    date: Date.now(),
                    type: typePhoto,
                    id: AuthService.user.id,
                }
                PhotoService.photoData.photos.push(iphoto)
                this.setUserPhoto()
            })
    }

    public setUserPhoto() {
        PhotoService.photoData.id = AuthService.user.id
        PhotoService.photoData.name = AuthService.user.name

        this.firebase
            .collection('relevamiento')
            .doc(PhotoService.photoData.id)
            .set(PhotoService.photoData)
    }

    public async getUserPhotos() {
        try {
            const data: any = await this.firebase
                .collection('relevamiento')
                .ref.doc(AuthService.user.id)
                .get()

            if (data.data()) PhotoService.photoData = data.data()
            console.log(PhotoService.photoData)
        } catch (err) {
            console.log(
                'Error at fetching UserPhotos at PhotoService line 75: ',
                err
            )
        }
    }

    public getAllPhotosObservable() {
        return this.firebase
            .collection<IUserPhotos>('relevamiento')
            .valueChanges()
    }

    public async likePhoto(foto) {
        console.log(foto)
        const snap = await this.firebase
            .collection('relevamiento')
            .ref.doc(foto.id)
            .get()

        const data: any = snap.data()

        for (let i = 0; i < data.photos.length; i++) {
            console.log(data.photos[i].photo)
            if (data.photos[i].photo === foto.photo) {
                data.photos[i].likes = foto.likes
                data.photos[i].pplLiked = foto.pplLiked
            }
        }
        this.firebase.collection('relevamiento').doc(data.id).set(data)
    }
}
