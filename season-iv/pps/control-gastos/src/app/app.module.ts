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

// --- Services ---
import { AuthService } from './services/auth.service'
import { NotificationsService } from './services/notifications.service'
import { ValidationsService } from './services/validations.service'

// --- Components Modules ---
import { MaterialModule } from './material/material.module'
import { LoginModule } from './components/login/login.module'
import { GlassSpinerModule } from './components/glass-spiner/glass-spiner.module'
import { MenuModule } from './components/menu/menu.module'
import { MenuTwoModule } from './components/menutwo/menu.module'
import { PieChartModule } from './components/pie-chart/pie-chart.module'
import { ChartsModule } from 'ng2-charts'
import { MyphotosModule } from './components/myphotos/myphotos.module'
import { BarChartModule } from './components/bar-chart/bar-chart.module'

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
        MenuModule,
        MenuTwoModule,
        PieChartModule,
        ChartsModule,
        MyphotosModule,
        BarChartModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
