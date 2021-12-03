import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
  ImageOptions,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private storage: AngularFireStorage) {}

  public async takePhoto(): Promise<Photo> {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 50,
    });
    return capturedPhoto;
  }

  public async savePhoto(profilePic: string) {
    const path = `fotos/${Date.now()}.jpeg`;
    const pictures = await this.storage.ref(path);

    await pictures
      .putString(profilePic, 'data_url', { contentType: 'image/jpeg' })
      .then(() => {
        console.log('IMG SUBIDA');
      });

    await this.storage
      .ref(path)
      .getDownloadURL()
      .toPromise()
      .then((url) => {
        AuthService.user.path = String(url);
        console.log(AuthService.user.path);
      });
  }
}
