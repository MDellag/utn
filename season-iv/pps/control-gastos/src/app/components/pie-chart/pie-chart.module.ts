import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChartType, ChartOptions } from 'chart.js'
import { ChartsModule } from 'ng2-charts'
import { PieChartComponent } from './pie-chart.component'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from 'src/app/material/material.module'
import { RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@NgModule({
    declarations: [PieChartComponent],
    imports: [
        CommonModule,
        ChartsModule,
        FormsModule,
        BrowserModule,
        MaterialModule,
        RouterModule,
    ],
    providers: [AuthService],
    exports: [PieChartComponent],
})
export class PieChartModule {}
