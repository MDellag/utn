import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CookieService } from 'ngx-cookie-service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



/* ----- MODULES ----- */
import { MaterialModule } from './material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { SplashModule } from './components/splash/splash.module';
import { AnonimusLoginModule } from './components/anonimus-login/anonimus-login.module';
import { SpinnerModule } from './components/spinner/spinner.module';
import { BartenderModule } from './pages/bartender/bartender.module';
import { MozoModule } from './pages/mozo/mozo.module';
import { CocineroModule } from './pages/cocinero/cocinero.module';
import { MetreModule } from './pages/metre/metre.module';
import { ListaPagosModule } from './components/lista-pagos/lista-pagos.module';
import { Interception } from './fcm';
import { FCM } from '@ionic-native/fcm/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioService } from './services/audio.service';
import { HacerConsultaModule } from './components/hacer-consulta/hacer-consulta.module';
import { EncuestaModule } from './components/encuesta/encuesta.module';

//import 'chartjs-plugin-zoom';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    LoginModule,
    RegisterModule,
    RouterModule,
    AnonimusLoginModule,
    SplashModule,
    SpinnerModule,
    BartenderModule,
    MozoModule,
    CocineroModule,
    MetreModule,
    ListaPagosModule,
    HacerConsultaModule,
    EncuestaModule,
    
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: Interception, multi: true },
    SplashScreen,
    BarcodeScanner,
    CookieService,
    LocalNotifications,
    FCM,
    NativeAudio,
    AudioService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
