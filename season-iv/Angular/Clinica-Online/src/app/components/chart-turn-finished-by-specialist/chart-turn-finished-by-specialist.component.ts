import { Component, Input, OnInit } from '@angular/core'
import { ChartType, ChartOptions } from 'chart.js'
import { SingleDataSet, Label } from 'ng2-charts'
import { Turno, TurnoStatus } from 'src/app/interfaces/turno'
import { TurnosService } from 'src/app/services/turnos.service'
import { Subject } from 'rxjs'
import { InformesComponent } from 'src/app/pages/informes/informes.component'
import { StartEnd } from 'src/app/interfaces/date'
import { ExportService } from 'src/app/services/export.service'
import { Chart } from 'angular-highcharts'

@Component({
  selector: 'app-chart-turn-finished-by-specialist',
  templateUrl: './chart-turn-finished-by-specialist.component.html',
  styleUrls: ['./chart-turn-finished-by-specialist.component.scss'],
})
export class ChartTurnFinishedBySpecialistComponent implements OnInit {
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
      text: 'Cant Turnos Finalizados por Especialista',
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
        turno.status === TurnoStatus.REALIZADO &&
        this.rangeDates(turno)
      ) {
        this.specialists[turno.name_especialista] = 1
      } else if (turno.status === TurnoStatus.REALIZADO) {
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
      this.dates = date
      this.chart.removeSeries(0)
      this.getAllTurns()
    })
  }
}
