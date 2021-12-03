import { Component, OnInit } from '@angular/core'
import { ChartType, ChartOptions } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts'
import { Turno } from 'src/app/interfaces/turno'
import { ExportService } from 'src/app/services/export.service'
import { TurnosService } from 'src/app/services/turnos.service'
import { Chart } from 'angular-highcharts'
@Component({
  selector: 'app-chart-turn-speciality',
  templateUrl: './chart-turn-speciality.component.html',
  styleUrls: ['./chart-turn-speciality.component.scss'],
})
export class ChartTurnSpecialityComponent implements OnInit {
  turnList: Turno[] = []
  specialities: any = {}

  constructor(
    private readonly turnService: TurnosService,
    private readonly csv: ExportService
  ) {}

  chart = new Chart({
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Cant Turnos por Especialidad',
    },
    credits: {
      enabled: false,
    },
    series: [],
  })

  exportCsv() {
    this.csv.downloadFile(
      [this.specialities],
      'estadisticas-turno-especialidad'
    )
  }

  getAllTurns() {
    this.turnService.getAllTurns().subscribe((turnos: any) => {
      this.turnList = turnos
      this.setUpSpecialities(this.turnList)
      this.setupLabelsAndData()
    })
  }

  setUpSpecialities(list: Turno[]) {
    for (const turno of list) {
      if (!this.specialities[turno.especialidad]) {
        this.specialities[turno.especialidad] = 1
      } else {
        this.specialities[turno.especialidad]++
      }
    }
  }

  setupLabelsAndData() {
    const dataarr: any = []
    for (const [key, value] of Object.entries(this.specialities)) {
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
    this.getAllTurns()
  }
}
