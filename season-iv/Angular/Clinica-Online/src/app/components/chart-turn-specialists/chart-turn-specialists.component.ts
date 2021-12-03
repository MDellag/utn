import { Component, OnInit } from '@angular/core'
import { ChartType, ChartOptions } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts'
import { StartEnd } from 'src/app/interfaces/date'
import { Turno } from 'src/app/interfaces/turno'
import { InformesComponent } from 'src/app/pages/informes/informes.component'
import { ExportService } from 'src/app/services/export.service'
import { TurnosService } from 'src/app/services/turnos.service'
import { Chart } from 'angular-highcharts'

@Component({
  selector: 'app-chart-turn-specialists',
  templateUrl: './chart-turn-specialists.component.html',
  styleUrls: ['./chart-turn-specialists.component.scss'],
})
export class ChartTurnSpecialistsComponent implements OnInit {
  turnList: Turno[] = []
  specialists: any = {}
  dates!: StartEnd

  constructor(
    private readonly turnService: TurnosService,
    private readonly informes: InformesComponent,
    private readonly csv: ExportService
  ) {}

  chart = new Chart({
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Cant Turnos por Especialista',
    },
    credits: {
      enabled: false,
    },
    series: [],
  })

  exportCsv() {
    this.csv.downloadFile(
      [this.specialists],
      'estadisticas-turnos-finalizados-especialista'
    )
  }

  getAllTurns() {
    this.turnService.getAllTurns().subscribe((turnos: any) => {
      this.turnList = turnos
      this.setupDates(this.turnList)
      this.setupLabelsAndData()
    })
  }

  rangeDates(turno_a: Turno): boolean {
    let spl = turno_a.date.split(' ')
    spl = spl[0].split('-')

    const turno: any = {
      date: {
        day: spl[0],
        month: spl[1],
      },
    }
    return (
      turno.date.day >= this.dates.start.day &&
      turno.date.month >= this.dates.start.month &&
      turno.date.day <= this.dates.end.day &&
      turno.date.month <= this.dates.end.month
    )
  }

  setupDates(list: Turno[]) {
    for (const turno of list) {
      if (
        !this.specialists[turno.name_especialista] &&
        this.rangeDates(turno)
      ) {
        this.specialists[turno.name_especialista] = 1
      } else {
        this.specialists[turno.name_especialista]++
      }
    }
  }

  setupLabelsAndData() {
    const dataarr: any = []
    for (const [key, value] of Object.entries(this.specialists)) {
      dataarr.push([key, value])
    }
    this.chart.addSeries(
      {
        type: 'pie',
        name: 'key',
        data: dataarr,
      },
      true,
      true
    )
  }

  ngOnInit(): void {
    this.informes.dateSubject.subscribe((date: StartEnd) => {
      this.specialists = {}
      this.chart.removeSeries(0)
      this.dates = date
      this.getAllTurns()
    })
  }
}
