import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts'
import { ETypePhoto, IPhoto } from 'src/app/interfaces/iphoto'
import { PhotoService } from 'src/app/services/photo.service'
import { MenuTwoComponent } from '../menutwo/menu.component'

@Component({
    selector: 'app-pie-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    public static photoToShow = ''
    public photos: any = {}

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

    public barChartData: ChartDataSets[] = [{ data: [], label: 'Likes' }]

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
    ) {}

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
    }

    back() {
        this.router.navigate(['menutwo'])
    }

    async ngOnInit() {
        this.photo.getAllPhotosObservable().subscribe((usersPhotoData) => {
            this.barChartLabels = []
            this.barChartData[0].data = []
            this.photos = {}
            for (let i = 0; i < usersPhotoData.length; i++) {
                for (let p = 0; p < usersPhotoData[i].photos.length; p++) {
                    if (
                        !this.photos[
                            usersPhotoData[i].photos[p].date.toString()
                        ] &&
                        usersPhotoData[i].photos[p].type === ETypePhoto.Feo
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

                        this.barChartLabels.push(
                            `id: ${usersPhotoData[i].photos[p].date}`
                        )
                        console.log(this.barChartData)
                        this.barChartData[0].data.push(
                            usersPhotoData[i].photos[p].likes
                        )
                        console.log(this.barChartData[0].data)

                        this.photos[
                            usersPhotoData[i].photos[p].date.toString()
                        ] = usersPhotoData[i].photos[p].photo
                    }
                }
            }
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
