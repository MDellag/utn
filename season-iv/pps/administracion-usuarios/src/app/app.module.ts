import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { environment } from 'src/environments/environment'
import { DeviceMotion } from '@ionic-native/device-motion/ngx'
// --- Services ---
import { AuthService } from './services/auth.service'
import { NativeAudio } from '@ionic-native/native-audio/ngx'
// --- Components Modules ---
import { MaterialModule } from './material/material.module'
import { LoginModule } from './components/login/login.module'
import { GlassSpinerModule } from './components/glass-spiner/glass-spiner.module'
import { AudioService } from './services/audio.service'
import { MotionService } from './services/motion.service'
import { Flashlight } from '@ionic-native/flashlight/ngx'
import { FormsModule } from '@angular/forms'
import { AltasModule } from './components/altas/altas.module'
import { PhotosService } from './services/photos.service'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        MaterialModule,
        GlassSpinerModule,
        LoginModule,
        FormsModule,
        AltasModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthService,
        DeviceMotion,
        AudioService,
        MotionService,
        NativeAudio,
        Flashlight,
        PhotosService,
        BarcodeScanner,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
