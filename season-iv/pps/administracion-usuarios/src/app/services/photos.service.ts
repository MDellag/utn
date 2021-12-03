import { Injectable } from '@angular/core'
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
    ImageOptions,
} from '@capacitor/camera'
import { AngularFireStorage } from '@angular/fire/storage'
import { AuthService } from './auth.service'
import { AltasComponent } from '../components/altas/altas.component'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
@Injectable({
    providedIn: 'root',
})
export class PhotosService {
    constructor(
        private storage: AngularFireStorage,
        private barcodeScanner: BarcodeScanner
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

    public async savePhoto(profilePic: string) {
        const path = `pics/${Date.now()}.jpeg`
        const pictures = await this.storage.ref(path)

        await pictures
            .putString(profilePic, 'data_url', { contentType: 'image/jpeg' })
            .then(() => {
                console.log('IMG SUBIDA')
            })

        let url = ''
        await this.storage
            .ref(path)
            .getDownloadURL()
            .toPromise()
            .then((url) => {
                AltasComponent.phot = url
            })

        return url
    }

    async scanDni(): Promise<any> {
        const barcodeData = await this.barcodeScanner.scan({
            formats: 'PDF_417',
        })

        return barcodeData.text
    }
}
