import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// ---- Module ----
import { MaterialModule } from './material/material.module';
import { LoginModule } from './components/login/login.module';
import { GlassSpinerModule } from './components/glass-spiner/glass-spiner.module';

// ---- Services ----
import { AuthService } from './services/auth.service';
import { HomeModule } from './components/home/home.module';
import { SplashScreen } from '@capacitor/core';
import { SplashModule } from './components/splash/splash.module';

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
    LoginModule,
    MaterialModule,
    GlassSpinerModule,
    HomeModule,
    SplashModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    BarcodeScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
