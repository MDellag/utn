import { Component, OnInit } from '@angular/core'
import { ChartType, ChartOptions } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts'
import { Turno } from 'src/app/interfaces/turno'
import { ExportService } from 'src/app/services/export.service'
import { TurnosService } from 'src/app/services/turnos.service'
import { Chart } from 'angular-highcharts'

@Component({
  selector: 'app-chart-turn-day',
  templateUrl: './chart-turn-day.component.html',
  styleUrls: ['./chart-turn-day.component.scss'],
})
export class ChartTurnDayComponent implements OnInit {
  turnList: Turno[] = []
  dates: any = {}

  constructor(
    private readonly turnService: TurnosService,
    private readonly csv: ExportService
  ) {}

  chart = new Chart({
    exporting: {
      chartOptions: {
        // specific options for the exported image
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
      fallbackToExportServer: false,
    },
    chart: {
      type: 'line',
    },
    title: {
      text: 'Cant Turnos por Dia',
    },
    credits: {
      enabled: false,
    },
    series: [],
  })

  addSerie(serie: any) {
    this.chart.addSeries(serie, true, true)
  }

  exportCsv() {
    const data: any = []
    const obj: any = {}
    for (const key of Object.keys(this.dates)) {
      const value = this.dates[key].data.filter((r: number) => r !== 0)
      obj[key] = value[0]
    }
    data.push(obj)
    this.csv.downloadFile(data, 'estadisticas-turnos-por-fecha')
  }

  getAllTurns() {
    this.turnService.getAllTurns().subscribe((turnos: any) => {
      this.turnList = turnos
      this.setupDates(this.turnList)
      this.setupLabelsAndData()
    })
  }

  setupDates(list: Turno[]) {
    let idx = 0
    for (const turno of list) {
      const dateSpl = turno.date.split(' ')

      if (!this.dates[dateSpl[0]]) {
        this.dates[dateSpl[0]] = {}
        if (idx === 0) {
          this.dates[dateSpl[0]].data = [1]
        } else if (idx > 0) {
          for (let a = 0; a <= idx; a++) {
            if (a === 0) {
              this.dates[dateSpl[0]].data = [0]
            } else if (a === idx) {
              this.dates[dateSpl[0]].data.push(1)
            } else {
              this.dates[dateSpl[0]].data.push(0)
            }
          }
        }
        this.dates[dateSpl[0]].idx = idx
        idx += 1
      } else {
        this.dates[dateSpl[0]].data[this.dates[dateSpl[0]].idx]++
      }

      for (const [key, value] of Object.entries(this.dates)) {
        this.dates[key].data.push(0)
      }
    }
  }

  setupLabelsAndData() {
    for (const [key, value] of Object.entries(this.dates)) {
      this.chart.addSeries(
        {
          type: 'line',
          name: key,
          data: this.dates[key].data as number[],
        },
        true,
        true
      )
    }
  }

  ngOnInit(): void {
    this.getAllTurns()
  }
}
