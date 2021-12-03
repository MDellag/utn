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
        private photo: PhotoService,
        public dialog: MatDialog,
        private router: Router
    ) {
        monkeyPatchChartJsTooltip()
        monkeyPatchChartJsLegend()
    }

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
    }

    back() {
        this.router.navigate(['menu'])
    }

    async ngOnInit() {
        this.photo.getAllPhotosObservable().subscribe((usersPhotoData) => {
            this.pieChartData = []
            this.pieChartLabels = []
            PieChartComponent.photos = {}
            for (let i = 0; i < usersPhotoData.length; i++) {
                for (let p = 0; p < usersPhotoData[i].photos.length; p++) {
                    if (
                        !PieChartComponent.photos[
                            usersPhotoData[i].photos[p].date.toString()
                        ] &&
                        usersPhotoData[i].photos[p].type === ETypePhoto.Lindo
                    ) {
                        /*            const data: IPhoto = {
                            author: usersPhotoData[i].name,
                            photo: usersPhotoData[i].photos[p].photo,
                            date: new Date(usersPhotoData[i].photos[p].date),
                            likes: usersPhotoData[i].photos[p].likes,
                            pplLiked: usersPhotoData[i].photos[p].pplLiked,
                            id: usersPhotoData[i].photos[p].id,
                            type: usersPhotoData[i].photos[p].type,
                        } */

                        this.pieChartLabels.push([
                            `Author: ${usersPhotoData[i].name}`,
                            `id: ${usersPhotoData[i].photos[p].date}`,
                        ])
                        this.pieChartData.push(
                            usersPhotoData[i].photos[p].likes
                        )

                        PieChartComponent.photos[
                            usersPhotoData[i].photos[p].date.toString()
                        ] = usersPhotoData[i].photos[p].photo
                    }
                }
            }
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
