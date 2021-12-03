import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuTwoComponent } from './menu.component'
import { MaterialModule } from 'src/app/material/material.module'
import { GlassSpinerModule } from '../glass-spiner/glass-spiner.module'

@NgModule({
    declarations: [MenuTwoComponent],
    imports: [CommonModule, MaterialModule, GlassSpinerModule],
    providers: [MaterialModule],
    exports: [MenuTwoComponent],
})
export class MenuTwoModule {}
