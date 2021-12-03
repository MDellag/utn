import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ChartType, ChartOptions } from 'chart.js'
import {
    SingleDataSet,
    Label,
    monkeyPatchChartJsLegend,
    monkeyPatchChartJsTooltip,
} from 'ng2-charts'
import { ETypePhoto, IPhoto } from 'src/app/interfaces/iphoto'
import { AuthService } from 'src/app/services/auth.service'
import { PhotoService } from 'src/app/services/photo.service'
import { MenuTwoComponent } from '../menutwo/menu.component'

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    public static photoToShow = ''
    public static photos: any = {}
    public allData: any = []
    // Pie
    public pieChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    }
    public pieChartLabels: Label[] = []
    public pieChartData: SingleDataSet = []
    public pieChartType: ChartType = 'pie'
    public pieChartLegend = true
    public pieChartPlugins = []

    //llamado en el html
    private donutColors = [
        {
            backgroundColor: [
                '#00cdcd',
                '#a64747',
                '#b8bd6c',
                '#ffff00',
                '#042001',
                '#313447',
                '#3a8ac0',
                '#fa84b4',
                '#93c727',
            ],
        },
    ]

    constructor(
        private auth: AuthService,
        public dialog: MatDialog,
        private router: Router
    ) {
        monkeyPatchChartJsTooltip()
        monkeyPatchChartJsLegend()
    }
    /* 
    async openDialog(item) {
        const dialogRef = this.dialog.open(DialogPhoto)
        console.log(item)

        const num = item.active[0]._chart.config.data.labels[
            item.active[0]._index
        ][1].replace(/^\D+/g, '') //esta maravilla extrae los numeros de los strings

        PieChartComponent.photoToShow = num
        dialogRef.afterClosed().subscribe(async (result) => {
            console.log(result)
        })
    } */

    changeToImpuestos() {
        this.pieChartData = []
        this.pieChartLabels = []
        this.allData.forEach((e: any) => {
            this.pieChartData.push(e.impuestos)
            this.pieChartLabels.push(e.id)
        })
    }

    changeToAlimentos() {
        this.pieChartData = []
        this.pieChartLabels = []
        this.allData.forEach((e: any) => {
            this.pieChartData.push(e.alimentos)
            this.pieChartLabels.push(e.id)
        })
    }

    changeToMedicina() {
        this.pieChartData = []
        this.pieChartLabels = []
        this.allData.forEach((e: any) => {
            this.pieChartData.push(e.medicina)
            this.pieChartLabels.push(e.id)
        })
    }

    changeToServicios() {
        this.pieChartData = []
        this.pieChartLabels = []
        this.allData.forEach((e: any) => {
            this.pieChartData.push(e.servicios)
            this.pieChartLabels.push(e.id)
        })
    }

    back() {
        this.router.navigate(['home'])
    }

    async ngOnInit() {
        this.auth.getGastos().subscribe((gastos) => {
            this.pieChartData = []
            this.allData = []
            gastos.forEach((gasto: any) => {
                if (!this.allData.find((e) => e.id === gasto.id)) {
                    this.pieChartData.push(gasto.medicina)
                    this.allData.push(gasto)
                    this.pieChartLabels.push(gasto.id)
                }
            })
        })
    }
}

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-photo.html',
})
export class DialogPhoto {
    public imageToShow = ''
    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<DialogPhoto>
    ) {
        this.imageToShow =
            PieChartComponent.photos[PieChartComponent.photoToShow]
    }

    viewPhoto(resp) {
        // PieChartComponent.photoToShow = ''

        this.dialogRef.close(resp)
    }
}
