import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts'
import { ETypePhoto, IPhoto } from 'src/app/interfaces/iphoto'
import { AuthService } from 'src/app/services/auth.service'
import { PhotoService } from 'src/app/services/photo.service'
import { MenuTwoComponent } from '../menutwo/menu.component'

@Component({
    selector: 'app-pie-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    public static photoToShow = ''
    public allData: any = []

    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            labels: {
                fontColor: 'black',
            },
        },
    }
    public barChartLabels: Label[] = []
    public barChartType: ChartType = 'bar'
    public barChartLegend = true
    public barChartPlugins = []

    public barChartData: ChartDataSets[] = [
        { data: [], label: 'Ahorros Anuales' },
        { data: [], label: 'Gastos Anuales' },
    ]

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
    ) {}
    /* 
    async openDialog(item) {
        const dialogRef = this.dialog.open(DialogPhoto2)
        console.log(item)

        const num = item.active[0]._chart.config.data.labels[
            item.active[0]._index
        ].replace(/^\D+/g, '') //esta maravilla extrae los numeros de los strings

        BarChartComponent.photoToShow = this.photos[num]
        dialogRef.afterClosed().subscribe(async (result) => {
            console.log(result)
        })
    } */

    back() {
        this.router.navigate(['home'])
    }

    async ngOnInit() {
        this.auth.getGastos().subscribe((gastos) => {
            this.barChartLabels = []
            this.barChartData[0].data = []
            this.allData = []
            gastos.forEach((gasto: any) => {
                if (!this.allData.find((e) => e.id === gasto.id)) {
                    this.allData.push(gasto)
                    const gastoAnual =
                        gasto.servicios +
                        gasto.medicina +
                        gasto.alimentos +
                        gasto.impuestos
                    this.barChartData[0].data.push(gasto.salario - gastoAnual)
                    this.barChartData[1].data.push(gastoAnual)
                    this.barChartLabels.push(gasto.id)
                }
            })
        })
    }
}

@Component({
    selector: 'dialog2-content-example-dialog',
    templateUrl: 'dialog2-photo.html',
})
export class DialogPhoto2 {
    public imageToShow = BarChartComponent.photoToShow
    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<DialogPhoto2>
    ) {
        this.imageToShow = BarChartComponent.photoToShow
    }

    viewPhoto(resp) {
        // PieChartComponent.photoToShow = ''

        this.dialogRef.close(resp)
    }
}
