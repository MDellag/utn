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
import { NativeAudio } from '@ionic-native/native-audio/ngx'
// --- Services ---
import { AuthService } from './services/auth.service'
import { NotificationsService } from './services/notifications.service'
import { ValidationsService } from './services/validations.service'

// --- Components Modules ---
import { MaterialModule } from './material/material.module'
import { LoginModule } from './components/login/login.module'
import { GlassSpinerModule } from './components/glass-spiner/glass-spiner.module'
import { FormControl } from '@angular/forms'
import { AudioService } from './services/audio.service'

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
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthService,
        FormControl,
        NativeAudio,
        AudioService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
