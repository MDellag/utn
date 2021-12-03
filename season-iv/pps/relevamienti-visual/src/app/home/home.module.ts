import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'

import { HomePageRoutingModule } from './home-routing.module'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        RouterModule,
        MaterialModule,
    ],
    declarations: [HomePage],
})
export class HomePageModule {}
