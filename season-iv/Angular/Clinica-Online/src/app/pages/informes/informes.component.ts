import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { StartEnd } from 'src/app/interfaces/date'
import { ExportService } from 'src/app/services/export.service'
import { LogsService } from 'src/app/services/logs.service'

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
  host: { style: 'width:100%; display: flex; justify-content: space-around' },
})
export class InformesComponent implements OnInit {
  logsList: any = []
  fetching: boolean = true
  range: any = { start: '', end: '' }
  dates: StartEnd = { start: { day: 0, month: 0 }, end: { day: 0, month: 0 } }

  public dateSubject: Subject<StartEnd> = new Subject<StartEnd>()

  constructor(
    private readonly logs: LogsService,
    private readonly csv: ExportService
  ) {}

  displayedColumns: string[] = ['email', 'day', 'time']

  onRangeChange() {
    const start = new Date(this.range.start)
    const end = new Date(this.range.end)

    this.dates.start.day = start.getDate()
    this.dates.start.month = start.getMonth() + 1

    this.dates.end.day = end.getDate()
    this.dates.end.month = end.getMonth() + 1

    this.dateSubject.next(this.dates)
  }

  getAllLogs() {
    this.fetching = true
    this.logs.getLogs().subscribe((log) => {
      this.logsList = log
    })
    this.fetching = false
  }

  exportLogsCsv() {
    const logs: any = []
    for (const log of this.logsList) {
      const date = new Date(log.date)
      logs.push({
        email: log.email,
        dia: `${date.getDate()} - ${date.getMonth() + 1}`,
        hora: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      })
    }

    this.csv.downloadFile(logs, 'clinica-logs')
  }

  ngOnInit(): void {
    this.getAllLogs()
  }
}
