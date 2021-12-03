import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage, TurnOffDialog } from './home.page'

import { HomePageRoutingModule } from './home-routing.module'
import { MaterialModule } from '../material/material.module'
import { RouterModule } from '@angular/router'
import { MotionService } from '../services/motion.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        MaterialModule,
        RouterModule,
        // BrowserAnimationsModule,
    ],
    declarations: [HomePage, TurnOffDialog],
    providers: [MotionService],
})
export class HomePageModule {}
