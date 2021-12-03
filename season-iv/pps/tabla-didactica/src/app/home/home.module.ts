import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomePage } from './home.page'
import { HomePageRoutingModule } from './home-routing.module'
import { MaterialModule } from '../material/material.module'
import { AudioService } from '../services/audio.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    declarations: [HomePage],
    providers: [FormControl, AudioService],
})
export class HomePageModule {}
