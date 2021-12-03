import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from './menu.component'
import { MaterialModule } from 'src/app/material/material.module'
import { GlassSpinerModule } from '../glass-spiner/glass-spiner.module'

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule, MaterialModule, GlassSpinerModule, MaterialModule],
    providers: [MaterialModule],
    exports: [MenuComponent],
})
export class MenuModule {}
